import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar';
import { FooterComponent } from './pages/footer/footer';
import { CanvasRevealEffectComponent } from './components/canvas-reveal-effect/canvas-reveal-effect';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    CanvasRevealEffectComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = 'Habi Cailleau';
  showSidebar = false;
  activeSection = 'home';
  sidebarTooltip = '';

  /**
   * When true, the background dot-matrix skips its outward intro reveal
   * (used on every route except `/` so the entrance animation only plays
   * once on the home page).
   */
  skipBgIntro = false;

  /** Pure-white palette as in the source demo. */
  readonly bgColors: number[][] = [
    [255, 255, 255],
    [255, 255, 255],
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/' || url === '') {
          this.activeSection = 'home';
          this.skipBgIntro = false;
        } else if (url.includes('projects')) {
          this.activeSection = 'projects';
          this.skipBgIntro = true;
        } else if (url.includes('timeline')) {
          this.activeSection = 'timeline';
          this.skipBgIntro = true;
        } else if (url.includes('contact')) {
          this.activeSection = 'contact';
          this.skipBgIntro = true;
        }
      });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showSidebar = window.scrollY > 200;
  }
}
