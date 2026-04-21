import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

/**
 * Angular port of the React `CanvasRevealEffect` component.
 *
 * Renders a fullscreen WebGL2 (GLSL3) shader that draws an animated
 * grid of dots which either reveal outward from the center (intro)
 * or collapse toward the edges (outro).
 *
 * - Use `[skipIntroAnimation]="true"` to bypass the entry sweep
 *   so the dots are already visible and only their per-cell random
 *   flicker continues (used on routes other than home).
 */
@Component({
  selector: 'app-canvas-reveal-effect',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      class="canvas-reveal-root"
      [class]="containerClassName"
    >
      <canvas #glcanvas class="canvas-reveal-canvas"></canvas>
      <div *ngIf="showGradient" class="canvas-reveal-gradient"></div>
    </div>
  `,
  styles: [
    `
      .canvas-reveal-root {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .canvas-reveal-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }
      .canvas-reveal-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, #000, transparent);
        pointer-events: none;
      }
    `,
  ],
})
export class CanvasRevealEffectComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** Animation speed factor (mirrors the React prop). */
  @Input() animationSpeed = 3;

  /** Dot opacity stops sampled randomly per cell. */
  @Input() opacities: number[] = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1];

  /** Up to 3 colors as [r, g, b] in 0–255. */
  @Input() colors: number[][] = [
    [255, 255, 255],
    [255, 255, 255],
  ];

  /** Extra class added to the wrapping div. */
  @Input() containerClassName = '';

  /** Pixel size of each dot. */
  @Input() dotSize = 6;

  /** Toggles bottom→top dark gradient overlay. */
  @Input() showGradient = true;

  /** Total cell size in pixels (dot + spacing). */
  @Input() totalSize = 20;

  /**
   * If true, dots collapse toward the edges (outro animation).
   * If false, dots reveal outward from the center (intro).
   */
  @Input() reverse = false;

  /**
   * If true, skip the intro sweep entirely — dots are already
   * displayed and just keep their per-cell flicker animation.
   * Useful for non-home pages where the entrance has already played.
   */
  @Input() skipIntroAnimation = false;

  @ViewChild('glcanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.OrthographicCamera;
  private mesh?: THREE.Mesh;
  private material?: THREE.ShaderMaterial;
  private clock = new THREE.Clock();
  private rafId = 0;
  private resizeObserver?: ResizeObserver;
  /** Time offset added to clock so we can "skip" past the intro window. */
  private timeOffset = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.observeResize();
    this.startLoop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.material) return;

    if (
      changes['colors'] ||
      changes['opacities'] ||
      changes['dotSize'] ||
      changes['totalSize'] ||
      changes['reverse']
    ) {
      this.updateUniforms();
    }

    if (changes['skipIntroAnimation']) {
      this.applySkipOffset();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.material?.dispose();
    this.mesh?.geometry.dispose();
    this.renderer?.dispose();
  }

  // ---------------------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------------------

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement!;
    const width = parent.clientWidth || window.innerWidth;
    const height = parent.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      uniforms: this.buildUniforms(width, height),
      transparent: true,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    this.applySkipOffset();
  }

  private observeResize(): void {
    const parent = this.canvasRef.nativeElement.parentElement!;
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(parent);
  }

  private handleResize(): void {
    if (!this.renderer || !this.material) return;
    const parent = this.canvasRef.nativeElement.parentElement!;
    const width = parent.clientWidth || window.innerWidth;
    const height = parent.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    const pr = this.renderer.getPixelRatio();
    (this.material.uniforms['u_resolution'].value as THREE.Vector2).set(
      width * pr,
      height * pr
    );
  }

  private startLoop(): void {
    const tick = () => {
      this.rafId = requestAnimationFrame(tick);
      if (!this.renderer || !this.scene || !this.camera || !this.material) return;
      this.material.uniforms['u_time'].value =
        this.clock.getElapsedTime() + this.timeOffset;
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  // ---------------------------------------------------------------------------
  // Uniforms
  // ---------------------------------------------------------------------------

  private buildUniforms(width: number, height: number): {
    [key: string]: THREE.IUniform;
  } {
    const colorsArray = this.normalizeColors(this.colors);
    const pr = this.renderer?.getPixelRatio() ?? 1;

    return {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(width * pr, height * pr),
      },
      u_colors: {
        value: colorsArray.map(
          (c) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)
        ),
      },
      u_opacities: { value: this.opacities },
      u_total_size: { value: this.totalSize },
      u_dot_size: { value: this.dotSize },
      u_reverse: { value: this.reverse ? 1 : 0 },
    };
  }

  private updateUniforms(): void {
    if (!this.material) return;
    const colorsArray = this.normalizeColors(this.colors);
    this.material.uniforms['u_colors'].value = colorsArray.map(
      (c) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)
    );
    this.material.uniforms['u_opacities'].value = this.opacities;
    this.material.uniforms['u_total_size'].value = this.totalSize;
    this.material.uniforms['u_dot_size'].value = this.dotSize;
    this.material.uniforms['u_reverse'].value = this.reverse ? 1 : 0;
  }

  /**
   * Mirrors the React component's color expansion into a 6-slot palette.
   */
  private normalizeColors(colors: number[][]): number[][] {
    if (colors.length === 1) {
      return [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];
    }
    if (colors.length === 2) {
      return [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    }
    return [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
  }

  /**
   * The shader's intro window is governed by:
   *   opacity *= step(timing_offset, u_time * animation_speed_factor)
   * with `animation_speed_factor = 0.5` baked in the GLSL.
   *
   * To skip the intro we advance the time so that
   *   (clock + offset) * 0.5 > maxTimingOffset
   * Choosing offset = 1000s easily clears any reasonable grid size.
   */
  private applySkipOffset(): void {
    this.timeOffset = this.skipIntroAnimation ? 1000 : 0;
  }

  // ---------------------------------------------------------------------------
  // Shaders
  // ---------------------------------------------------------------------------

  private getVertexShader(): string {
    return /* glsl */ `
      precision mediump float;
      uniform vec2 u_resolution;
      out vec2 fragCoord;
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
        fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        fragCoord.y = u_resolution.y - fragCoord.y;
      }
    `;
  }

  private getFragmentShader(): string {
    return /* glsl */ `
      precision mediump float;
      in vec2 fragCoord;

      uniform float u_time;
      uniform float u_opacities[10];
      uniform vec3 u_colors[6];
      uniform float u_total_size;
      uniform float u_dot_size;
      uniform vec2 u_resolution;
      uniform int u_reverse;

      out vec4 fragColor;

      float PHI = 1.61803398874989484820459;
      float random(vec2 xy) {
        return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
      }

      void main() {
        vec2 st = fragCoord.xy;
        st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
        st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

        float opacity = step(0.0, st.x);
        opacity *= step(0.0, st.y);

        vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

        float frequency = 5.0;
        float show_offset = random(st2);
        float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
        opacity *= u_opacities[int(rand * 10.0)];
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

        vec3 color = u_colors[int(show_offset * 6.0)];

        float animation_speed_factor = 0.5;
        vec2 center_grid = u_resolution / 2.0 / u_total_size;
        float dist_from_center = distance(center_grid, st2);

        float timing_offset_intro = dist_from_center * 0.01 + (random(st2) * 0.15);
        float max_grid_dist = distance(center_grid, vec2(0.0, 0.0));
        float timing_offset_outro =
          (max_grid_dist - dist_from_center) * 0.02 + (random(st2 + 42.0) * 0.2);

        float current_timing_offset;
        if (u_reverse == 1) {
          current_timing_offset = timing_offset_outro;
          opacity *= 1.0 - step(current_timing_offset, u_time * animation_speed_factor);
          opacity *= clamp(
            (step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25,
            1.0,
            1.25
          );
        } else {
          current_timing_offset = timing_offset_intro;
          opacity *= step(current_timing_offset, u_time * animation_speed_factor);
          opacity *= clamp(
            (1.0 - step(current_timing_offset + 0.1, u_time * animation_speed_factor)) * 1.25,
            1.0,
            1.25
          );
        }

        fragColor = vec4(color, opacity);
        fragColor.rgb *= fragColor.a;
      }
    `;
  }
}
