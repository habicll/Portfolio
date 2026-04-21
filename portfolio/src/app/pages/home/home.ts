import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  NgZone,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);

  @ViewChild('particleCanvas', { static: false }) particleCanvasRef!: ElementRef<HTMLCanvasElement>;

  animState = {
    status: false,
    heading: false,
    scroll: false,
  };

  // UTC Clock
  utcTime = '';
  private clockInterval: any = null;

  // Tech accordion
  activeAccordion = -1;
  techAccordion = [
    { title: 'REACT / NEXT.JS', description: 'Modern frontend frameworks for building performant web applications with server-side rendering and static generation.', chips: ['REACT 19', 'NEXT.JS 16', 'TAILWIND CSS'] },
    { title: 'NODE.JS / EXPRESS', description: 'Backend runtime and framework for building scalable APIs and real-time applications.', chips: ['REST API', 'SOCKET.IO', 'MIDDLEWARE'] },
    { title: 'TYPESCRIPT', description: 'Type-safe JavaScript superset for building robust, maintainable codebases.', chips: ['STRICT MODE', 'GENERICS', 'DECORATORS'] },
    { title: 'POSTGRESQL / REDIS', description: 'Relational database with advanced querying and in-memory caching for high-performance data layers.', chips: ['SQL', 'CACHING', 'MIGRATIONS'] },
    { title: 'AWS / DOCKER', description: 'Cloud infrastructure and containerization for scalable, reproducible deployments.', chips: ['EC2', 'DOCKER-COMPOSE', 'CI/CD'] },
  ];

  // Featured projects (top 3 from real data)
  featuredProjects = [
    {
      title: 'Real-time Chat Application',
      summary: 'A Discord-inspired real-time chat with WebSocket communication, role-based permissions, and async Rust backend.',
      skills: ['RUST', 'NEXT.JS'],
      categoryLabel: '01 / SYSTEM CORE',
      github: '',
      image: 'discord.png',
    },
    {
      title: 'VR & AI Interview Simulator',
      summary: 'An immersive visionOS training suite designed for high-stakes corporate recruitment, featuring real-time biometric feedback.',
      skills: ['VISIONOS', 'SWIFT'],
      categoryLabel: '02 / SPATIAL COMPUTING',
      github: 'https://github.com/augustinrouillard/Virtual-interview',
      image: 'vision.png',
    },
    {
      title: 'POLL-DOCKER Microservices',
      summary: 'A distributed fullstack framework optimized for edge-computing environments, reducing global latency by 45%.',
      skills: ['DOCKER', 'DEVOPS', 'CI/CD'],
      categoryLabel: '03 / INFRASTRUCTURE',
      github: 'https://github.com/habicll/POLL-DOCKER',
      image: 'docker.png',
    },
  ];

  // Contact mini-form
  formData = { name: '', email: '', message: '' };
  isSending = false;
  isSent = false;

  private serviceId = 'service_lf1rd91';
  private templateId = 'template_vukyz0y';
  private publicKey = '41QsRMlD8iYCXoH3J';

  // Particles
  private particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
  private particleAnim: number = 0;
  private mouseX = 0;
  private mouseY = 0;
  private destroyed = false;
  private observer: IntersectionObserver | null = null;
  private particleColor = '255, 224, 194';

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Staggered hero entrance
    setTimeout(() => (this.animState.status = true), 300);
    setTimeout(() => (this.animState.heading = true), 600);
    setTimeout(() => (this.animState.scroll = true), 1200);

    // UTC clock
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);

    // Scroll reveal
    this.setupScrollReveal();

    // EmailJS init
    try {
      if (emailjs && typeof (emailjs as any).init === 'function') {
        (emailjs as any).init(this.publicKey);
      }
    } catch (err) {
      console.warn('EmailJS init failed:', err);
    }

    // Canvas animations outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.initParticles();
      this.animateParticles();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.observer) this.observer.disconnect();
    if (this.clockInterval) clearInterval(this.clockInterval);
    cancelAnimationFrame(this.particleAnim);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  // ===== UTC CLOCK =====
  private updateClock() {
    const now = new Date();
    this.utcTime = now.toISOString().substring(11, 19);
  }

  // ===== ACCORDION =====
  toggleAccordion(index: number) {
    this.activeAccordion = this.activeAccordion === index ? -1 : index;
  }

  // ===== CARD TILT =====
  onCardTilt(event: MouseEvent, target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    target.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;

    const spotlight = target.querySelector('.work-card-spotlight') as HTMLElement;
    if (spotlight) {
      const primaryRgb = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-rgb')
        .trim() || '255, 224, 194';
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(${primaryRgb}, 0.06) 0%, transparent 60%)`;
      spotlight.style.opacity = '1';
    }
  }

  onCardTiltLeave(target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    target.style.transform = '';
    const spotlight = target.querySelector('.work-card-spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  }

  // ===== CONTACT FORM =====
  sendMessage() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    this.isSending = true;

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      message: this.formData.message,
    };

    (async () => {
      try {
        if (emailjs && typeof (emailjs as any).send === 'function') {
          await (emailjs as any).send(this.serviceId, this.templateId, templateParams);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '' };
        } else if ((emailjs as any).default && typeof (emailjs as any).default.send === 'function') {
          await (emailjs as any).default.send(this.serviceId, this.templateId, templateParams);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '' };
        }
      } catch (error) {
        console.error('EmailJS FAILED', error);
      } finally {
        this.isSending = false;
      }
    })();
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
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }

  // ===== GOLD PARTICLE FIELD =====
  private initParticles() {
    const canvas = this.particleCanvasRef?.nativeElement;
    if (!canvas) return;

    // Read the current theme primary color (RGB triplet) from CSS custom property
    const cssPrimaryRgb = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary-rgb')
      .trim();
    if (cssPrimaryRgb) this.particleColor = cssPrimaryRgb;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    this.particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.25 + 0.05,
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
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        p.vx += (dx / dist) * 0.015;
        p.vy += (dy / dist) * 0.015;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.particleColor}, ${p.alpha})`;
      ctx.fill();
    });

    // Gold connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${this.particleColor}, ${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    this.particleAnim = requestAnimationFrame(() => this.animateParticles());
  }
}
