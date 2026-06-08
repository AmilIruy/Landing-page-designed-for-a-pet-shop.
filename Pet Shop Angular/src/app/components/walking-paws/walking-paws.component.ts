import { Component, Input, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PawIconComponent } from '../paw-icon/paw-icon.component';

@Component({
  selector: 'app-walking-paws',
  standalone: true,
  imports: [CommonModule, PawIconComponent],
  template: `
    <div
      #container
      class="relative flex"
      [ngClass]="{
        'flex-row justify-center items-center gap-10': horizontal,
        'flex-col items-center gap-12': !horizontal,
        'className': true
      }"
    >
      <div
        *ngFor="let item of items; let i = index"
        class="w-9 h-9 md:w-11 md:h-11 transition-all cursor-pointer text-slate-800"
        [class]="getStepOffset(i)"
        [ngStyle]="getPawStyle(i)"
        [title]="'Siga as patinhas!'"
      >
        <app-paw-icon [color]="colors[i % colors.length]" className="w-full h-full"></app-paw-icon>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class WalkingPawsComponent implements OnInit, OnDestroy {
  @Input() count: number = 4;
  @Input() colors: string[] = ["#d2d700", "#3cbff0", "#e72585"];
  @Input() className: string = "";
  @Input() horizontal: boolean = false;

  items: any[] = [];
  scrollDirection: 'up' | 'down' = 'down';
  scrollProgress: number = 0;
  private lastScrollY = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.items = Array(this.count).fill(0);
    this.lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    this.updateScroll();
  }

  ngOnDestroy() {
    // Event listeners are handled by HostListener
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateScroll();
  }

  private updateScroll() {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine direction of scroll
    if (Math.abs(currentScrollY - this.lastScrollY) >= 4) {
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;
    }

    // Calculate component's scroll progress through viewport
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height || 120;

    // Progress goes from 0 (just entering bottom of screen) to 1 (just leaving top of screen)
    const visibleTop = rect.top;
    const totalRange = windowHeight + elementHeight - 80;
    const progress = (windowHeight - visibleTop) / totalRange;
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  getStepOffset(i: number): string {
    const isLeft = i % 2 === 0;
    if (this.horizontal) {
      return isLeft ? 'translate-y-1.5' : '-translate-y-1.5';
    } else {
      return isLeft ? 'translate-x-3.5' : '-translate-x-3.5';
    }
  }

  isActive(i: number): boolean {
    const stepSize = 1 / (this.count + 1);
    if (this.scrollDirection === 'down') {
      const threshold = 0.1 + i * stepSize;
      return this.scrollProgress >= threshold;
    } else {
      const reversedIndex = this.count - 1 - i;
      const threshold = 0.9 - reversedIndex * stepSize;
      return this.scrollProgress <= threshold;
    }
  }

  getPawStyle(i: number) {
    const isLeft = i % 2 === 0;
    const active = this.isActive(i);
    const alternateRotation = isLeft ? -12 : 12;
    
    let baseAngle = 0;
    if (this.horizontal) {
      baseAngle = this.scrollDirection === 'down' ? 90 : 270;
    } else {
      baseAngle = this.scrollDirection === 'down' ? 180 : 0;
    }
    const targetAngle = baseAngle + alternateRotation;

    const yOffset = active ? (this.scrollDirection === 'down' ? 3 : -3) : 0;
    const xOffset = (active && this.horizontal) ? (this.scrollDirection === 'down' ? 3 : -3) : 0;

    return {
      'opacity': active ? 0.9 : 0.08,
      'transform': `scale(${active ? 1.15 : 0.85}) rotate(${targetAngle}deg) translate(${xOffset}px, ${yOffset}px)`,
      'filter': active ? 'drop-shadow(0px 3px 6px rgba(0,0,0,0.06))' : 'none',
      'transition': 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.25s ease'
    };
  }
}
