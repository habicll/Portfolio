import { Component, AfterViewInit, OnDestroy, HostListener, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);
  private observer: IntersectionObserver | null = null;

  frontendSkills = [
    { name: 'ANGULAR & VUE.JS', level: 70, color: 'fill-cyan', animated: false },
    { name: 'TYPESCRIPT', level: 65, color: 'fill-violet', animated: false },
    { name: 'TAILWIND CSS', level: 80, color: 'fill-mixed', animated: false },
  ];

  frontendChips = ['JAVASCRIPT', 'HTML/CSS', 'VITE', 'RESPONSIVE DESIGN'];

  backendSkills = computed(() => {
    const t = this.i18n.t().about;
    return [
      { name: 'DJANGO / PYTHON', level: t.levelAdvanced, levelClass: 'level-advanced' },
      { name: 'SPRING BOOT / JAVA', level: t.levelAdvanced, levelClass: 'level-advanced' },
      { name: 'NODE.JS', level: t.levelIntermediate, levelClass: 'level-intermediate' },
      { name: 'RUST (AXUM)', level: t.levelIntermediate, levelClass: 'level-intermediate' },
      { name: 'SQL / POSTGRESQL', level: t.levelAdvanced, levelClass: 'level-advanced' },
    ];
  });

  cloudChips = ['DOCKER', 'DOCKER-COMPOSE', 'GITHUB ACTIONS', 'VERCEL', 'CI/CD PIPELINES'];

  techStack = [
    { name: 'Angular', icon: 'angular.png' },
    { name: 'TypeScript', icon: 'javascript.png' },
    { name: 'Rust', icon: 'rust.png' },
    { name: 'Next.js', icon: 'nextjs.png' },
    { name: 'Swift', icon: 'swift.png' },
    { name: 'Docker', icon: 'dock.png' },
    { name: 'Java', icon: 'java.png' },
    { name: 'Python', icon: 'python.png' },
    { name: 'Vue.js', icon: 'vue.png' },
    { name: 'Django', icon: 'django.png' },
    { name: 'Spring', icon: 'spring.png' },
    { name: 'Node.js', icon: 'node.png' },
    { name: 'C++', icon: 'c++.png' },
    { name: 'PHP', icon: 'php.png' },
    { name: 'FPGA', icon: 'fpga.png' },
  ];

  experiences = computed(() => {
    const t = this.i18n.t().about;
    return [
      { period: t.exp1Period, title: t.exp1Title, description: t.exp1Desc },
      { period: t.exp2Period, title: t.exp2Title, description: t.exp2Desc },
      { period: t.exp3Period, title: t.exp3Title, description: t.exp3Desc },
      { period: t.exp4Period, title: t.exp4Title, description: t.exp4Desc },
      { period: t.exp5Period, title: t.exp5Title, description: t.exp5Desc },
      { period: t.exp6Period, title: t.exp6Title, description: t.exp6Desc },
    ];
  });

  ngAfterViewInit() {
    this.setupScrollReveal();
    this.setupProgressAnimations();
    this.setupCounters();
  }

  // ===== BENTO CARD SPOTLIGHT =====
  onBentoHover(event: MouseEvent, target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--spotlight-x', `${x}px`);
    target.style.setProperty('--spotlight-y', `${y}px`);
  }

  // ===== TECH STACK ICON MAGNETIC =====
  onIconHover(event: MouseEvent, target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    target.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.12)`;
  }

  onIconLeave(target: EventTarget | null) {
    if (!target || !(target instanceof HTMLElement)) return;
    target.style.transform = '';
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

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
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }

  // ===== ANIMATED COUNTERS =====
  private setupCounters() {
    const counterEls = document.querySelectorAll('.about-counter[data-target]');
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

  private setupProgressAnimations() {
    setTimeout(() => {
      const progressObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.frontendSkills.forEach((skill, i) => {
                setTimeout(() => {
                  skill.animated = true;
                }, i * 200);
              });
              progressObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      const bentoFrontend = document.querySelector('.bento-frontend');
      if (bentoFrontend) {
        progressObserver.observe(bentoFrontend);
      }
    }, 100);
  }
}
