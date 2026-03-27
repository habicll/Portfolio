import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
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
  };

  isSending = false;
  isSent = false;

  private serviceId = 'service_lf1rd91';
  private templateId = 'template_vukyz0y';
  private publicKey = '41QsRMlD8iYCXoH3J';
  private observer: IntersectionObserver | null = null;

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
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

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

  private setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, index * 150);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => this.observer?.observe(el));
  }
}
