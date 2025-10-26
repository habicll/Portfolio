import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent implements OnInit {
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

  ngOnInit(): void {
    try {
      if (emailjs && typeof (emailjs as any).init === 'function') {
        (emailjs as any).init(this.publicKey);
      }
    } catch (err) {
      console.warn('EmailJS init failed:', err);
    }
  }

  sendMessage() {
    if (!this.formData.name || !this.formData.email || !this.formData.message)
      return;

    this.isSending = true;

    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      message: this.formData.message,
    };

    (async () => {
      try {
        if (emailjs && typeof (emailjs as any).send === 'function') {
          const resp = await (emailjs as any).send(this.serviceId, this.templateId, templateParams);
          console.log('EmailJS SUCCESS', resp);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '' };
        } else if ((emailjs as any).default && typeof (emailjs as any).default.send === 'function') {
          const resp = await (emailjs as any).default.send(this.serviceId, this.templateId, templateParams);
          console.log('EmailJS SUCCESS (default)', resp);
          this.isSent = true;
          this.formData = { name: '', email: '', message: '' };
        } else {
          throw new Error('emailjs send function not available. Check package and imports.');
        }
      } catch (error) {
        console.error('EmailJS FAILED', error);
        alert('Something went wrong sending the message. Please try again later.');
      } finally {
        this.isSending = false;
      }
    })();
  }
}