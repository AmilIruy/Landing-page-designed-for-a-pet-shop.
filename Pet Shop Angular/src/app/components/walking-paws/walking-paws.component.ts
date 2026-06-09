import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
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
        'flex-col items-center gap-12': !horizontal
      }"
      [class]="className"
    >
      <div
        *ngFor="let item of items; let i = index"
        class="w-9 h-9 md:w-11 md:h-11 cursor-pointer text-slate-800"
        [class]="getStepOffset(i)"
        [@pawState]="{
          value: isActive(i) ? 'active' : 'inactive',
          params: { 
            angle: getTargetAngle(i),
            x: getXOffset(i),
            y: getYOffset(i)
          }
        }"
        [title]="'Siga as patinhas!'"
      >
        <app-paw-icon [color]="colors[i % colors.length]" className="w-full h-full"></app-paw-icon>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
  animations: [
    trigger('pawState', [
      state('inactive', style({
        opacity: 0.08,
        transform: 'scale(0.85) rotate({{angle}}deg) translate(0, 0)',
        filter: 'none'
      }), { params: { angle: 0 } }),
      state('active', style({
        opacity: 0.9,
        transform: 'scale(1.15) rotate({{angle}}deg) translate({{x}}px, {{y}}px)',
        filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.06))'
      }), { params: { angle: 0, x: 0, y: 0 } }),
      // Transition with group to handle rotation instantly
      transition('* => *', [
        group([
          // Instant rotation
          animate('0ms', style({ transform: 'rotate({{angle}}deg)' })),
          // Spring-like animation for others
          animate('300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
        ])
      ])
    ])
  ]
})
export class WalkingPawsComponent implements OnInit {
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
    
    if (Math.abs(currentScrollY - this.lastScrollY) >= 4) {
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height || 120;

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

  getTargetAngle(i: number): number {
    const isLeft = i % 2 === 0;
    const alternateRotation = isLeft ? -12 : 12;
    let baseAngle = 0;
    if (this.horizontal) {
      baseAngle = this.scrollDirection === 'down' ? 90 : 270;
    } else {
      baseAngle = this.scrollDirection === 'down' ? 180 : 0;
    }
    return baseAngle + alternateRotation;
  }

  getXOffset(i: number): number {
    if (this.horizontal && this.isActive(i)) {
      return this.scrollDirection === 'down' ? 3 : -3;
    }
    return 0;
  }

  getYOffset(i: number): number {
    if (!this.horizontal && this.isActive(i)) {
      return this.scrollDirection === 'down' ? 3 : -3;
    }
    return 0;
  }
}

