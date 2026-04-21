import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { GooeyText } from '../../components/gooey-text/gooey-text';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, GooeyText],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);

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

  private destroyed = false;
  private observer: IntersectionObserver | null = null;

  constructor() {}

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
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.observer) this.observer.disconnect();
    if (this.clockInterval) clearInterval(this.clockInterval);
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
}
