import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    setTimeout(() => {
      const tracks = Array.from(document.querySelectorAll('.ribbon-track, .ribbon-track1')) as HTMLElement[];
      tracks.forEach(track => {
        try {
          if ((track as any).__ribbonFilled) return;
          const contents = Array.from(track.querySelectorAll('.ribbon-content')) as HTMLElement[];
          if (contents.length === 0) return;

          const first = contents[0];
          let firstWidth = Math.ceil(first.getBoundingClientRect().width) || first.scrollWidth || 0;

          if (!firstWidth) return;

          let totalContentWidth = Array.from(track.querySelectorAll('.ribbon-content')).reduce((sum, el: any) => sum + el.getBoundingClientRect().width, 0);

          let clones = 0;
          while (totalContentWidth < firstWidth * 2 && clones < 40) {
            const clone = first.cloneNode(true) as HTMLElement;
            track.appendChild(clone);
            totalContentWidth += clone.getBoundingClientRect().width || clone.scrollWidth;
            clones++;
          }

          track.style.setProperty('--shift', `${firstWidth}px`);


          (track as any).__ribbonFilled = true;
        } catch (e) {
        }
      });
    }, 150);
  }
}