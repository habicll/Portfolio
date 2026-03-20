import { Component, AfterViewInit, OnDestroy, HostListener, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);
  selectedProject: any = null;
  showAll = signal(false);
  private observer: IntersectionObserver | null = null;

  private projectsBase = [
    // Sorted newest → oldest
    { title: 'VR & AI Interview Simulator', period: 'Feb 2026', skills: ['SPEECH RECOGNITION', 'VISIONOS', 'SWIFTUI', 'AI'], github: 'https://github.com/augustinrouillard/Virtual-interview', image: 'vision.png', tKey: 1 },
    { title: 'POLL-DOCKER Microservices', period: 'Dec 2025', skills: ['DOCKER', 'DEVOPS', 'POSTGRESQL', 'MICROSERVICES'], github: 'https://github.com/habicll/POLL-DOCKER', image: 'docker.png', tKey: 2 },
    { title: 'Jenkins CI/CD Pipeline', period: 'Dec 2025', skills: ['QUALITY ASSURANCE', 'TEST PLANNING', 'GITHUB', 'CI/CD'], image: 'jenkins.jpg', tKey: 4 },
    { title: 'JAVAZ Tower Defense Game', period: 'Nov 2025', skills: ['OOP', 'JAVA', 'LIBGDX', 'GAME DEV'], github: 'https://github.com/habicll/JAVA_ZGame', image: 'Javaz_game.png', tKey: 5 },
    { title: 'LinkUp Matchmaking Platform', period: 'Oct 2025', skills: ['DJANGO', 'VUE 3', 'REST API', 'MYSQL'], github: 'https://github.com/habicll/LinkUp', image: 'linkup.jpg', tKey: 6 },
    { title: 'Grape — Angular Portfolio', period: 'Sep 2025', skills: ['ANGULAR', 'TYPESCRIPT', 'SPA', 'RESPONSIVE'], github: 'https://github.com/habicll/Grapes', image: 'grape.jpg', tKey: 7 },
    { title: 'Employee API — Spring Boot', period: 'Aug 2025', skills: ['SPRING BOOT', 'JPA', 'REST', 'JAVA 21'], github: '', image: 'java.jpg', tKey: 8 },
    { title: 'Intermarché Wine & Cheese Pairing', period: 'Apr 2025 — Jun 2025', skills: ['BUBBLE.IO', 'TECH LEAD', 'API', 'DATA'], github: 'https://github.com/algosup/2024-2025-project-5-bubble-intermarche-team-6', image: 'Inter.jpeg', tKey: 9 },
    { title: 'CrippleFN — Blockchain x AI', period: 'May 2025', skills: ['AI', 'PYTHON', 'BLOCKCHAIN', 'SYSTEM DESIGN'], github: 'https://github.com/Marwane666/CrippleFN/tree/blockchain', image: 'Cripple.jpeg', tKey: 10 },
    { title: 'FPGA Web Simulator — CNES', period: 'Feb 2025 — Mar 2025', skills: ['TECHNICAL WRITING', 'FPGA', 'DOCUMENTATION'], github: 'https://github.com/algosup/2024-2025-project-4-web-fpga-team-5', image: 'Cnes.jpeg', tKey: 11 },
    { title: 'Real-time Chat Application', period: 'Feb 2025', skills: ['SYSTEM CORE', 'NEXT.JS 16', 'RUST', 'WEBSOCKET'], image: 'discord.png', tKey: 0 },
    { title: 'Fichotron — GenAI Hackathon', period: 'Jan 2025 — Feb 2025', skills: ['PYTHON', 'AWS', 'GENERATIVE AI', 'DATA'], github: 'https://github.com/GuillotSamuel/GenAI_hackaton', image: 'fichotron.JPG', tKey: 12 },
    { title: 'Quickest Path — C++ Algorithm', period: 'Jan 2025 — Feb 2025', skills: ['C++', 'PROJECT MANAGEMENT', 'ALGORITHM'], github: 'https://github.com/algosup/2024-2025-project-3-quickest-path-team-5', image: 'Quickestpath.png', tKey: 13 },
    { title: 'Avalanche NFT Hackathon', period: 'Oct 2024', skills: ['BLOCKCHAIN', 'SMART CONTRACTS', 'NFC', 'PROTOCOL 9'], github: 'https://github.com/0xBelnadris/hackaton-blockchain-vierzon-2024', image: 'mooguis.png', tKey: 3 },
    { title: 'Frogger FPGA', period: 'Sep 2024 — Oct 2024', skills: ['VERILOG', 'FPGA', 'HARDWARE'], github: 'https://github.com/algosup/2024-2025-project-1-fpga-team-2', image: 'frogger.jpeg', tKey: 14 },
    { title: 'Adopte Un Candidat — Evolution', period: 'Apr 2024 — Jun 2024', skills: ['UX/UI', 'PROGRAM MANAGEMENT', 'FLUTTER'], github: 'https://github.com/algosup/2023-2024-project-5-flutter-team-3', image: 'evolution.png', tKey: 15 },
    { title: 'SportShield — Corris Innovation', period: 'Mar 2024 — Apr 2024', skills: ['QA', 'EMBEDDED', 'IOT'], github: 'https://github.com/algosup/2023-2024-project-4-SPORTSHIELD-team-4', image: 'coris.png', tKey: 16 },
  ];

  projects = computed(() => {
    const t = this.i18n.t().projects;
    const summaryKeys = ['p0Summary','p1Summary','p2Summary','p3Summary','p4Summary','p5Summary','p6Summary','p7Summary','p8Summary','p9Summary','p10Summary','p11Summary','p12Summary','p13Summary','p14Summary','p15Summary','p16Summary'];
    const descKeys = ['p0Desc','p1Desc','p2Desc','p3Desc','p4Desc','p5Desc','p6Desc','p7Desc','p8Desc','p9Desc','p10Desc','p11Desc','p12Desc','p13Desc','p14Desc','p15Desc','p16Desc'];
    return this.projectsBase.map((p) => ({
      ...p,
      summary: (t as any)[summaryKeys[p.tKey]] || '',
      description: (t as any)[descKeys[p.tKey]] || '',
    }));
  });

  featuredProjects = computed(() => this.projects().slice(0, 2));

  visibleProjects = computed(() => {
    const all = this.projects();
    return this.showAll() ? all.slice(2) : all.slice(2, 8);
  });

  ngAfterViewInit() {
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // ===== 3D TILT EFFECT ON PROJECT CARDS =====
  onCardTilt(event: MouseEvent, target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    target.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;

    const spotlight = target.querySelector('.card-spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,240,255,0.07) 0%, transparent 60%)`;
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

  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed)');
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }
}
