import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cpu-architecture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cpu-architecture.html',
  styleUrls: ['./cpu-architecture.css'],
  // Use None so the global keyframes / .cpu-line-N rules in styles.css apply
  encapsulation: ViewEncapsulation.None,
})
export class CpuArchitecture {
  @Input() className: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() text: string = 'CPU';
  @Input() showCpuConnections: boolean = true;
  @Input() lineMarkerSize: number = 8;
  @Input() animateText: boolean = true;
  @Input() animateLines: boolean = true;
  @Input() animateMarkers: boolean = true;

  /**
   * Dynamically size the CPU label so longer strings (e.g. "FULLSTACK DEVELOPER")
   * still fit cleanly inside the 30 SVG-unit wide CPU rectangle.
   * Box width = 30 (x: 85 → 115). We target ~26 usable units (margin = 2 each side).
   * Mono font glyph ≈ 0.6 × font-size.
   */
  get textFontSize(): number {
    const usableWidth = 26;
    const len = Math.max(this.text.length, 1);
    // Solve: len * fontSize * 0.6 <= usableWidth  =>  fontSize <= usableWidth / (len*0.6)
    const fitted = usableWidth / (len * 0.6);
    // Clamp between 1.8 (very long) and 7 (very short)
    return Math.max(1.8, Math.min(7, fitted));
  }
}
