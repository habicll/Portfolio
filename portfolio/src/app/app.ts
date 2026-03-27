import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar';
import { FooterComponent } from './pages/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = 'Habi Cailleau';
  showSidebar = false;
  activeSection = 'home';
  sidebarTooltip = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/' || url === '') {
          this.activeSection = 'home';
        } else if (url.includes('projects')) {
          this.activeSection = 'projects';
        } else if (url.includes('timeline')) {
          this.activeSection = 'timeline';
        } else if (url.includes('contact')) {
          this.activeSection = 'contact';
        }
      });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showSidebar = window.scrollY > 200;
  }
}
