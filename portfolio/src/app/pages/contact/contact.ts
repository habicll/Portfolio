import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  i18n = inject(TranslationService);
  formData = {
    name: '',
    email: '',
    message: '',
    objective: 'collaboration',
  };

  isSending = false;
  isSent = false;

  // Typing effect
  typedText = '';
  private fullText = '';
  private typeIndex = 0;
  private typeTimer: any = null;
  showCursor = true;
  private cursorTimer: any = null;
  private typingEffect = effect(() => {
    // React to language changes
    const text = this.i18n.t().contact.typingText;
    this.fullText = text;
    // Restart typing when language changes
    if (this.typeTimer) clearTimeout(this.typeTimer);
    this.typeIndex = 0;
    this.typedText = '';
    this.typeNext();
  });

  // Network canvas
  @ViewChild('networkCanvas', { static: false }) networkCanvasRef!: ElementRef<HTMLCanvasElement>;
  private netAnim: number = 0;
  private netNodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
  private destroyed = false;

  // Network widget dots (kept for fallback)
  networkDots: { x: number; y: number; delay: number }[] = [];

  private serviceId = 'service_lf1rd91';
  private templateId = 'template_vukyz0y';
  private publicKey = '41QsRMlD8iYCXoH3J';

  constructor(private ngZone: NgZone) {
    // Generate random network dots
    this.networkDots = Array.from({ length: 20 }, () => ({
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 3000,
    }));
  }

  ngOnInit(): void {
    try {
      if (emailjs && typeof (emailjs as any).init === 'function') {
        (emailjs as any).init(this.publicKey);
      }
    } catch (err) {
      console.warn('EmailJS init failed:', err);
    }
  }

  ngAfterViewInit() {
    // Staggered reveal animations
    const elements = document.querySelectorAll('.reveal-contact');
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 200 + i * 150);
    });

    // Typing effect is started by the effect() — no manual call needed

    // Start blinking cursor
    this.cursorTimer = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 530);

    // Start network canvas animation
    this.ngZone.runOutsideAngular(() => {
      this.initNetworkCanvas();
      this.animateNetwork();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.typeTimer) clearTimeout(this.typeTimer);
    if (this.cursorTimer) clearInterval(this.cursorTimer);
    cancelAnimationFrame(this.netAnim);
  }

  // ===== TYPING EFFECT =====
  private startTyping() {
    this.typeIndex = 0;
    this.typedText = '';
    this.typeNext();
  }

  private typeNext() {
    if (this.typeIndex < this.fullText.length) {
      this.typedText += this.fullText[this.typeIndex];
      this.typeIndex++;
      const delay = 40 + Math.random() * 60;
      this.typeTimer = setTimeout(() => this.typeNext(), delay);
    }
  }

  // ===== NETWORK CANVAS =====
  private initNetworkCanvas() {
    const canvas = this.networkCanvasRef?.nativeElement;
    if (!canvas) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    canvas.width = rect?.width || 300;
    canvas.height = rect?.height || 200;

    // Create nodes
    this.netNodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));
  }

  private animateNetwork() {
    if (this.destroyed) return;

    const canvas = this.networkCanvasRef?.nativeElement;
    if (!canvas) {
      this.netAnim = requestAnimationFrame(() => this.animateNetwork());
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    this.netNodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < this.netNodes.length; i++) {
      for (let j = i + 1; j < this.netNodes.length; j++) {
        const a = this.netNodes[i];
        const b = this.netNodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Pulse effect on a random node
    const pulseNode = this.netNodes[Math.floor(Math.random() * this.netNodes.length)];
    if (Math.random() < 0.02) {
      ctx.beginPath();
      ctx.arc(pulseNode.x, pulseNode.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.fill();
    }

    this.netAnim = requestAnimationFrame(() => this.animateNetwork());
  }

  sendMessage() {
    if (!this.formData.name || !this.formData.email || !this.formData.message)
      return;

    this.isSending = true;

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      message: `[${this.formData.objective}] ${this.formData.message}`,
    };

    (async () => {
      try {
        if (emailjs && typeof (emailjs as any).send === 'function') {
          const resp = await (emailjs as any).send(this.serviceId, this.templateId, templateParams);
          console.log('EmailJS SUCCESS', resp);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '', objective: 'collaboration' };
        } else if ((emailjs as any).default && typeof (emailjs as any).default.send === 'function') {
          const resp = await (emailjs as any).default.send(this.serviceId, this.templateId, templateParams);
          console.log('EmailJS SUCCESS (default)', resp);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '', objective: 'collaboration' };
        } else {
          throw new Error('emailjs send function not available.');
        }
      } catch (error) {
        console.error('EmailJS FAILED', error);
        alert('Transmission failed. Please try again later.');
      } finally {
        this.isSending = false;
      }
    })();
  }
}
