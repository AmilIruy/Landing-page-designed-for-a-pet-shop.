import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { LucideCalendar, LucideTrash2, LucideCheckCircle, LucideClock } from '@lucide/angular';

import { HeroComponent } from './components/hero/hero.component';
import { BathGroomingComponent } from './components/bath-grooming/bath-grooming.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactMapComponent } from './components/contact-map/contact-map.component';
import { SocialFooterComponent } from './components/social-footer/social-footer.component';
import { WalkingPawsComponent } from './components/walking-paws/walking-paws.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { BackgroundDoodlesComponent } from './components/background-doodles/background-doodles.component';
import { Appointment } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LucideCalendar,
    LucideTrash2,
    LucideCheckCircle,
    LucideClock,
    HeroComponent,
    BathGroomingComponent,
    ProductsComponent,
    ContactMapComponent,
    SocialFooterComponent,
    WalkingPawsComponent,
    BookingModalComponent,
    ContactModalComponent,
    BackgroundDoodlesComponent
  ],
  templateUrl: './app.component.html',
  animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ scale: 0, opacity: 0 }),
        animate('300ms ease-out', style({ scale: 1, opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ scale: 0, opacity: 0 }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ x: 350, opacity: 0 }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ x: 0, opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ x: 350, opacity: 0 }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  isBookingOpen = false;
  isContactOpen = false;
  appointments: Appointment[] = [];
  showBookingsPane = false;

  ngOnInit() {
    const saved = localStorage.getItem("pet_appointments");
    if (saved) {
      try {
        this.appointments = JSON.parse(saved);
      } catch (e) {
        console.error("Local storage error:", e);
      }
    }
  }

  handleAddBooking(appt: Appointment) {
    this.appointments = [appt, ...this.appointments];
    localStorage.setItem("pet_appointments", JSON.stringify(this.appointments));
  }

  handleDeleteBooking(id: string) {
    this.appointments = this.appointments.filter((item) => item.id !== id);
    localStorage.setItem("pet_appointments", JSON.stringify(this.appointments));
  }

  formatDate(dateStr: string): string {
    return dateStr.split("-").reverse().join("/");
  }
}
