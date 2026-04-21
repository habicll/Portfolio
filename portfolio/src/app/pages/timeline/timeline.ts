import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener,
  inject,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css'],
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);

  utcTime = '';
  lineProgress = 0;
  private clockInterval: any = null;
  private observer: IntersectionObserver | null = null;
  private nodePositions: number[] = [];

  // Chronological order: newest first
  experiences = computed(() => {
    const t = this.i18n.t().timeline;
    return [
      {
        period: t.exp1Period,
        title: t.exp1Title,
        company: t.exp1Company,
        description: t.exp1Desc,
        chips: ['VISIONOS', 'SWIFT', 'AI', 'SPEECH RECOGNITION'],
        milestone: t.exp1Milestone,
        milestoneSub: t.exp1MilestoneSub,
      },
      {
        period: t.exp2Period,
        title: t.exp2Title,
        company: t.exp2Company,
        description: t.exp2Desc,
        chips: ['ANGULAR', 'TYPESCRIPT', 'SYSTEM DESIGN'],
        milestone: t.exp2Milestone,
        milestoneSub: t.exp2MilestoneSub,
      },
      {
        period: t.exp3Period,
        title: t.exp3Title,
        company: t.exp3Company,
        description: t.exp3Desc,
        chips: ['ADAPTABILITY', 'COMMUNICATION'],
        milestone: t.exp3Milestone,
        milestoneSub: t.exp3MilestoneSub,
      },
      {
        period: t.exp5Period,
        title: t.exp5Title,
        company: t.exp5Company,
        description: t.exp5Desc,
        chips: ['BLOCKCHAIN', 'AI', 'PYTHON'],
        milestone: t.exp5Milestone,
        milestoneSub: t.exp5MilestoneSub,
      },
      {
        period: t.exp4Period,
        title: t.exp4Title,
        company: t.exp4Company,
        description: t.exp4Desc,
        chips: ['C++', 'JAVA', 'VERILOG', 'FLUTTER'],
        milestone: t.exp4Milestone,
        milestoneSub: t.exp4MilestoneSub,
      },
      {
        period: t.exp6Period,
        title: t.exp6Title,
        company: t.exp6Company,
        description: t.exp6Desc,
        chips: ['NSI', 'MATHEMATICS'],
        milestone: t.exp6Milestone,
        milestoneSub: t.exp6MilestoneSub,
      },
    ];
  });

  constructor() {
    // Re-apply reveal classes when language changes
    effect(() => {
      this.i18n.lang(); // track the signal
      setTimeout(() => {
        this.reapplyRevealed();
      }, 0);
    });
  }

  ngAfterViewInit() {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
    this.setupScrollReveal();
    this.updateLineProgress();
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.observer) this.observer.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateLineProgress();
  }

  isNodeFilled(index: number): boolean {
    if (!this.nodePositions.length) this.cacheNodePositions();
    const nodePos = this.nodePositions[index];
    if (nodePos === undefined) return false;

    const section = document.querySelector('.timeline-section');
    if (!section) return false;
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    const sectionHeight = sectionRect.height;

    // The line progress represents how far down the line has filled
    const lineFilledPx = (this.lineProgress / 100) * sectionHeight;
    const nodeRelativePos = nodePos - sectionTop;

    return lineFilledPx >= nodeRelativePos;
  }

  private cacheNodePositions() {
    const nodes = document.querySelectorAll('.timeline-node');
    this.nodePositions = Array.from(nodes).map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top + window.scrollY;
    });
  }

  private updateClock() {
    const now = new Date();
    this.utcTime = now.toISOString().substring(11, 19) + ' UTC';
  }

  private updateLineProgress() {
    const section = document.querySelector('.timeline-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;

    // Recache node positions on scroll (they may shift)
    this.nodePositions = [];

    if (rect.top > windowHeight) {
      this.lineProgress = 0;
    } else if (rect.bottom < 0) {
      this.lineProgress = 100;
    } else {
      // Progress based on how much of the section the viewport midpoint has passed
      const viewportMid = windowHeight * 0.6;
      const scrolled = viewportMid - rect.top;
      const progress = Math.min(100, Math.max(0, (scrolled / sectionHeight) * 100));
      this.lineProgress = progress;
    }
  }

  private reapplyRevealed() {
    // When language changes, Angular re-renders *ngFor items.
    // New elements won't have 'revealed' class. Re-apply to all visible ones.
    const allRevealable = document.querySelectorAll(
      '.timeline-hero .reveal, .timeline-section .timeline-card, .timeline-section .timeline-node, .journey-section .reveal'
    );
    allRevealable.forEach((el) => {
      el.classList.add('revealed');
    });
    // Also re-setup observer for any new elements
    this.setupScrollReveal();
  }

  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed)');
    if (!revealElements.length) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }
}
