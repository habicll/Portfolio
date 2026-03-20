import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  HostListener,
  NgZone,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);

  @ViewChild('wireframeCanvas', { static: false }) wireframeCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('particleCanvas', { static: false }) particleCanvasRef!: ElementRef<HTMLCanvasElement>;

  animState = {
    badge: false,
    heading: false,
    subtitle: false,
    ctas: false,
    cards: false,
    scroll: false,
  };

  // Magnetic card transforms
  private cardTransforms: string[] = ['', '', '', ''];
  private observer: IntersectionObserver | null = null;
  private wireframeAnim: number = 0;
  private particleAnim: number = 0;
  private scrollY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private destroyed = false;

  // Wireframe icosahedron data
  private vertices: number[][] = [];
  private edges: number[][] = [];
  private rotX = 0;
  private rotY = 0;

  // Particles
  private particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Staggered hero entrance
    setTimeout(() => (this.animState.badge = true), 200);
    setTimeout(() => (this.animState.heading = true), 500);
    setTimeout(() => (this.animState.subtitle = true), 900);
    setTimeout(() => (this.animState.ctas = true), 1200);
    setTimeout(() => (this.animState.cards = true), 800);
    setTimeout(() => (this.animState.scroll = true), 1500);

    this.setupScrollReveal();
    this.setupCounters();

    // Run canvas animations outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      this.initWireframe();
      this.initParticles();
      this.animateWireframe();
      this.animateParticles();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.observer) this.observer.disconnect();
    cancelAnimationFrame(this.wireframeAnim);
    cancelAnimationFrame(this.particleAnim);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
    this.applyParallax();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  // ===== MAGNETIC CARD HOVER =====
  onCardMouseMove(event: MouseEvent, index: number) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const maxMove = 8;
    const moveX = (x / rect.width) * maxMove;
    const moveY = (y / rect.height) * maxMove;
    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
  }

  onCardMouseLeave(index: number) {
    const cards = document.querySelectorAll('.specialty-card');
    if (cards[index]) {
      (cards[index] as HTMLElement).style.transform = '';
    }
  }

  // ===== 3D TILT EFFECT ON FEATURED CARDS =====
  onTiltMove(event: MouseEvent, el: EventTarget | null) {
    if (!el || !(el instanceof HTMLElement)) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    // Shine effect
    const shine = el.querySelector('.tilt-shine') as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,240,255,0.08) 0%, transparent 60%)`;
    }
  }

  onTiltLeave(el: EventTarget | null) {
    if (!el || !(el instanceof HTMLElement)) return;
    el.style.transform = '';
  }

  // ===== PARALLAX =====
  private applyParallax() {
    const lines = document.querySelectorAll('[data-parallax]');
    lines.forEach((el, index) => {
      const speed = parseFloat((el as HTMLElement).dataset['parallax'] || '0');
      const yOffset = this.scrollY * speed * 3;
      const xOffset = Math.sin(this.scrollY * 0.003 + index * 1.5) * (8 + index * 4);
      const skew = this.scrollY * speed * 0.15;
      (el as HTMLElement).style.transform = `translateY(${yOffset}px) translateX(${xOffset}px) skewX(${skew}deg)`;
      (el as HTMLElement).style.opacity = `${Math.max(0.4, 1 - this.scrollY * 0.001)}`;
    });
  }

  // ===== ANIMATED COUNTERS =====
  private setupCounters() {
    const counterEls = document.querySelectorAll('[data-target]');
    if (!counterEls.length) return;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset['target'] || '0', 10);
            this.animateCounter(el, target);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  }

  private animateCounter(el: HTMLElement, target: number) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target.toString();
        return;
      }
      el.textContent = Math.floor(current).toString();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ===== SCROLL REVEAL =====
  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }

  // ===== 3D WIREFRAME ICOSAHEDRON =====
  private initWireframe() {
    const canvas = this.wireframeCanvasRef?.nativeElement;
    if (!canvas) return;

    // Generate icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const scale = 200;
    this.vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map((v) => v.map((c) => c * scale));

    // Icosahedron edges (20 triangular faces → 30 edges)
    this.edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
      [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
      [4, 5], [9, 1], [2, 11], [6, 10], [8, 7],
    ];

    canvas.width = 700;
    canvas.height = 700;
  }

  private animateWireframe() {
    if (this.destroyed) return;

    const canvas = this.wireframeCanvasRef?.nativeElement;
    if (!canvas) {
      this.wireframeAnim = requestAnimationFrame(() => this.animateWireframe());
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Rotation based on scroll + auto-rotation
    this.rotX += 0.003;
    this.rotY = this.scrollY * 0.002 + this.rotX * 0.5;

    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);

    // Project 3D → 2D
    const projected = this.vertices.map(([x, y, z]) => {
      // Rotate Y
      let nx = x * cosY - z * sinY;
      let nz = x * sinY + z * cosY;
      // Rotate X
      let ny = y * cosX - nz * sinX;
      nz = y * sinX + nz * cosX;
      // Perspective projection
      const perspective = 600;
      const scale = perspective / (perspective + nz + 200);
      return {
        x: nx * scale + canvas.width / 2,
        y: ny * scale + canvas.height / 2,
        z: nz,
        scale,
      };
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    this.edges.forEach(([a, b]) => {
      const pa = projected[a];
      const pb = projected[b];
      const avgZ = (pa.z + pb.z) / 2;
      const alpha = Math.max(0.08, Math.min(0.5, (avgZ + 300) / 600));

      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw vertices as dots
    projected.forEach((p) => {
      const alpha = Math.max(0.15, Math.min(0.7, (p.z + 300) / 500));
      const size = Math.max(1, p.scale * 2.5);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.fill();
    });

    this.wireframeAnim = requestAnimationFrame(() => this.animateWireframe());
  }

  // ===== PARTICLE FIELD =====
  private initParticles() {
    const canvas = this.particleCanvasRef?.nativeElement;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    this.particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.3 + 0.05,
    }));
  }

  private animateParticles() {
    if (this.destroyed) return;

    const canvas = this.particleCanvasRef?.nativeElement;
    if (!canvas) {
      this.particleAnim = requestAnimationFrame(() => this.animateParticles());
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((p) => {
      // Mouse attraction (subtle)
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx += (dx / dist) * 0.02;
        p.vy += (dy / dist) * 0.02;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connections between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    this.particleAnim = requestAnimationFrame(() => this.animateParticles());
  }
}
