import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/navbar/navbar';
import { FooterComponent } from './pages/footer/footer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = 'Habi Cailleau';
}
