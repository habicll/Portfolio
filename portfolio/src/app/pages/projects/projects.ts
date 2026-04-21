import { Component, AfterViewInit, OnDestroy, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);
  selectedProject: any = null;
  showAll = signal(false);
  private observer: IntersectionObserver | null = null;

  private projectsBase = [
    { title: 'VR & AI Interview Simulator', period: 'Feb 2026', skills: ['VISIONOS', 'SWIFT', 'AI', 'SPEECH RECOGNITION'], github: 'https://github.com/augustinrouillard/Virtual-interview', image: 'vision.png', tKey: 1 },
    { title: 'POLL-DOCKER Microservices', period: 'Dec 2025', skills: ['DOCKER', 'DEVOPS', 'POSTGRESQL', 'MICROSERVICES'], github: 'https://github.com/habicll/POLL-DOCKER', image: 'docker.png', tKey: 2 },
    { title: 'Real-time Chat Application', period: 'Jan 2026', skills: ['RUST', 'NEXT.JS', 'WEBSOCKET'], github: '', image: 'discord.png', tKey: 3 },
    { title: 'Jenkins CI/CD Pipeline', period: 'Dec 2025', skills: ['QUALITY ASSURANCE', 'GITHUB', 'CI/CD'], image: 'jenkins.jpg', tKey: 4 },
    { title: 'JAVAZ Tower Defense Game', period: 'Nov 2025', skills: ['OOP', 'JAVA', 'LIBGDX', 'GAME DEV'], github: 'https://github.com/habicll/JAVA_ZGame', image: 'Javaz_game.png', tKey: 5 },
    { title: 'LinkUp Matchmaking Platform', period: 'Oct 2025', skills: ['DJANGO', 'VUE 3', 'REST API', 'MYSQL'], github: 'https://github.com/habicll/LinkUp', image: 'linkup.jpg', tKey: 6 },
    { title: 'Grape — Angular Portfolio', period: 'Sep 2025', skills: ['ANGULAR', 'TYPESCRIPT', 'SPA'], github: 'https://github.com/habicll/Grapes', image: 'grape.jpg', tKey: 7 },
    { title: 'Employee API — Spring Boot', period: 'Aug 2025', skills: ['SPRING BOOT', 'JPA', 'REST', 'JAVA 21'], github: '', image: 'java.jpg', tKey: 8 },
    { title: 'Intermarche Wine & Cheese Pairing', period: 'Apr — Jun 2025', skills: ['BUBBLE.IO', 'TECH LEAD', 'API'], github: 'https://github.com/algosup/2024-2025-project-5-bubble-intermarche-team-6', image: 'Inter.jpeg', tKey: 9 },
    { title: 'CrippleFN — Blockchain x AI', period: 'Oct 2024', skills: ['AI', 'PYTHON', 'BLOCKCHAIN'], github: 'https://github.com/Marwane666/CrippleFN/tree/blockchain', image: 'Cripple.jpeg', tKey: 10 },
    { title: 'FPGA Web Simulator — CNES', period: 'Jan — Mar 2025', skills: ['PYTHON', 'FPGA', 'RESPONSIVE'], github: 'https://github.com/algosup/2024-2025-project-4-web-fpga-team-4', image: 'Cnes.jpeg', tKey: 11 },
    { title: 'Evolution — 2D Platformer', period: 'Nov 2024 — Jan 2025', skills: ['C', 'CSFML', 'GAME DEV'], github: 'https://github.com/algosup/2024-2025-project-2-serious-game-team-4', image: 'Evolution.jpeg', tKey: 12 },
    { title: 'QuickestPath — C++ API', period: 'Sep — Oct 2024', skills: ['C++', 'API', 'XML/JSON'], github: 'https://github.com/algosup/2024-2025-project-3-quickest-path-team-4', image: 'QuickestPath.jpeg', tKey: 13 },
    { title: 'Frogger — FPGA Verilog', period: 'Sep — Oct 2024', skills: ['VERILOG', 'FPGA', 'VGA'], github: 'https://github.com/algosup/2024-2025-project-1-fpga-team-4', image: 'frogger.jpeg', tKey: 14 },
    { title: 'Mooguis — Recruitment App', period: 'Jun 2024', skills: ['UX DESIGN', 'FIGMA', 'PROGRAM MANAGEMENT'], github: '', image: 'Mooguis.jpeg', tKey: 15 },
    { title: 'Fichotron — Sports Security', period: 'Mar 2024', skills: ['EMBEDDED', 'IOT', 'MOBILE'], github: '', image: 'Fichotron.jpeg', tKey: 16 },
  ];

  projects = computed(() => {
    const t = this.i18n.t().projects;
    return this.projectsBase.map((p) => ({
      ...p,
      summary: (t as any)[`p${p.tKey}Summary`] || p.title,
      description: (t as any)[`p${p.tKey}Desc`] || '',
    }));
  });

  featuredProjects = computed(() => {
    return this.projects().slice(0, 2);
  });

  visibleProjects = computed(() => {
    const all = this.projects();
    return this.showAll() ? all.slice(2) : all.slice(2, 8);
  });

  constructor() {
    // Fix: re-apply revealed class when language changes
    effect(() => {
      this.i18n.lang(); // track the signal
      setTimeout(() => {
        this.reapplyRevealed();
      }, 0);
    });
  }

  ngAfterViewInit() {
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

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

    const spotlight = target.querySelector('.card-spotlight') as HTMLElement;
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
    const spotlight = target.querySelector('.card-spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  }

  openProject(project: any) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProject() {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  toggleShowAll() {
    this.showAll.set(!this.showAll());
    if (this.showAll()) {
      setTimeout(() => this.setupScrollReveal(), 50);
    }
  }

  private reapplyRevealed() {
    // When language changes, Angular re-renders *ngFor items.
    // New DOM elements won't have 'revealed' class. Re-apply to all visible ones.
    const allRevealable = document.querySelectorAll(
      '.projects-hero .reveal, .projects-featured .reveal, .projects-featured .featured-project-card, .projects-grid-section .reveal, .projects-grid-section .project-card, .projects-toggle .reveal'
    );
    allRevealable.forEach((el) => {
      el.classList.add('revealed');
    });
    // Re-setup observer for any truly new elements
    this.setupScrollReveal();
  }

  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.projects-hero .reveal:not(.revealed), .projects-featured .reveal:not(.revealed), .projects-grid-section .reveal:not(.revealed)');
    if (!revealElements.length) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, index * 80);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }
}
