import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paw-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [class]="className">
      <!-- Central pad (carpal/metacarpal pad) -->
      <path
        d="M12 14.5C9.5 14.5 7.8 16.2 8 18.5C8.1 20.3 9.6 21.5 12 21.5C14.4 21.5 15.9 20.3 16 18.5C16.2 16.2 14.5 14.5 12 14.5Z"
        [attr.fill]="color"
      />
      <!-- Toe 1 (leftmost) -->
      <path
        d="M5.5 11.5C4.4 11.5 3.5 12.6 3.5 14C3.5 15.4 4.4 16.5 5.5 16.5C6.6 16.5 7.5 15.4 7.5 14C7.5 12.6 6.6 11.5 5.5 11.5Z"
        [attr.fill]="color"
      />
      <!-- Toe 2 (inner left) -->
      <path
        d="M9.2 7.5C8.1 7.5 7.2 8.6 7.2 10C7.2 11.4 8.1 12.5 9.2 12.5C10.3 12.5 11.2 11.4 11.2 10C11.2 8.6 10.3 7.5 9.2 7.5Z"
        [attr.fill]="color"
      />
      <!-- Toe 3 (inner right) -->
      <path
        d="M14.8 7.5C13.7 7.5 12.8 8.6 12.8 10C12.8 11.4 13.7 12.5 14.8 12.5C15.9 12.5 16.8 11.4 16.8 10C16.8 8.6 15.9 7.5 14.8 7.5Z"
        [attr.fill]="color"
      />
      <!-- Toe 4 (rightmost) -->
      <path
        d="M18.5 11.5C17.4 11.5 16.5 12.6 16.5 14C16.5 15.4 17.4 16.5 18.5 16.5C19.6 16.5 20.5 15.4 20.5 14C20.5 12.6 19.6 11.5 18.5 11.5Z"
        [attr.fill]="color"
      />
    </svg>
  `
})
export class PawIconComponent {
  @Input() className: string = 'w-6 h-6';
  @Input() color: string = 'currentColor';
}
