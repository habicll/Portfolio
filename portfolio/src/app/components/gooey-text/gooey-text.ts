import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Angular port of the "Gooey Text Morphing" React component.
 *
 * Cycles through a list of strings, blending each word into the next
 * using an SVG goo threshold filter applied to two absolutely-positioned
 * text layers. The blur + opacity interpolation on both layers, passed
 * through `feColorMatrix` thresholding, produces the "liquid merge" feel.
 *
 * Usage:
 *   <app-gooey-text
 *     [texts]="['I', 'am', 'a', 'fullstack developer']"
 *     [morphTime]="1"
 *     [cooldownTime]="0.25">
 *   </app-gooey-text>
 */
@Component({
  selector: 'app-gooey-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gooey-text.html',
  styleUrls: ['./gooey-text.css'],
  // Let global styles + filter-url lookups resolve normally.
  encapsulation: ViewEncapsulation.None,
})
export class GooeyText implements AfterViewInit, OnChanges, OnDestroy {
  /** Strings to cycle through. */
  @Input() texts: string[] = [];
  /** Seconds spent morphing between two words. */
  @Input() morphTime = 1;
  /** Seconds a word is fully shown before the next morph starts. */
  @Input() cooldownTime = 0.25;
  /** Extra class appended to the root wrapper. */
  @Input() className = '';
  /** Extra class appended to each text span (e.g. for sizing). */
  @Input() textClassName = '';

  @ViewChild('text1', { static: true }) text1Ref!: ElementRef<HTMLSpanElement>;
  @ViewChild('text2', { static: true }) text2Ref!: ElementRef<HTMLSpanElement>;

  private rafId = 0;
  private running = false;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.startAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If the texts input changes after init, restart the loop from the
    // beginning so we don't end up with stale references.
    if (!this.running) return;
    if (changes['texts'] || changes['morphTime'] || changes['cooldownTime']) {
      this.stopAnimation();
      this.startAnimation();
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  // ---------------------------------------------------------------------------
  // Animation
  // ---------------------------------------------------------------------------

  private startAnimation(): void {
    if (!this.texts || this.texts.length === 0) return;
    if (!this.text1Ref || !this.text2Ref) return;

    this.running = true;

    const morphTime = this.morphTime;
    const cooldownTime = this.cooldownTime;
    const texts = this.texts;

    // Start so that the first fully visible word is texts[0].
    // Setting textIndex = length - 1 means the very first increment
    // (which happens at the end of the first cooldown) lands on 0.
    let textIndex = texts.length - 1;
    let time = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;

    const t1 = this.text1Ref.nativeElement;
    const t2 = this.text2Ref.nativeElement;

    // Prime the two spans with the first two words so the screen isn't
    // blank until the first increment happens.
    t1.textContent = texts[textIndex % texts.length];
    t2.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      // Second layer fades in.
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      // First layer fades out (using 1 - fraction).
      const inv = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      t2.style.filter = '';
      t2.style.opacity = '100%';
      t1.style.filter = '';
      t1.style.opacity = '0%';
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = (now: number) => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(animate);

      const shouldIncrementIndex = cooldown > 0;
      const dt = (now - time) / 1000;
      time = now;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          t1.textContent = texts[textIndex % texts.length];
          t2.textContent = texts[(textIndex + 1) % texts.length];
        }
        morph += dt;
        doMorph();
      } else {
        doCooldown();
      }
    };

    // Run outside Angular to avoid change-detection churn on every frame.
    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame(animate);
    });
  }

  private stopAnimation(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }
}
