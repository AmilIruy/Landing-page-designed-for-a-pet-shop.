import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCamera, LucideUsers, LucideVideo, LucideHeart, LucideArrowDown, LucideExternalLink } from '@lucide/angular';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { PawIconComponent } from '../paw-icon/paw-icon.component';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-social-footer',
  standalone: true,
  imports: [CommonModule, LucideCamera, LucideUsers, LucideVideo, LucideHeart, LucideArrowDown, LucideExternalLink, PawIconComponent, AnimateOnScrollDirective],
  template: `
    <footer 
      appAnimateOnScroll
      (visible)="isVisible = $event"
      class="relative bg-slate-900 text-white py-16 px-6 md:px-12 overflow-hidden border-t-8 border-pet-lime"
    >
      <!-- Decorative vector background -->
      <div class="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div class="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10 space-y-10">
        
        <!-- Footprint brand tag -->
        <div class="flex items-center gap-3 mb-2">
          <img
            src="assets/images/lg-t1.svg"
            alt="Logo Pet Shop"
            referrerPolicy="no-referrer"
            class="w-10 h-10 object-contain text-white"
          />
          <span class="font-display font-black text-lg tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pet-lime via-pet-blue to-pet-pink">
            PET SHOP
          </span>
          <app-paw-icon color="#3cbff0" className="w-6 h-6 animate-pulse"></app-paw-icon>
        </div>

        <!-- Dynamic pointing phrase -->
        <div class="space-y-4 max-w-2xl">
          <p
            [@fadeInUp]="isVisible ? 'visible' : 'hidden'"
            class="text-lg md:text-xl font-medium tracking-wide text-slate-100"
          >
             Acompanhe nossa rotina repleta de fofura, amor e mimos diários! Siga nossas redes sociais e não perca nenhum pet feliz:
          </p>
          
          <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-pet-blue">
            <span>Explorar feeds</span>
            <svg lucideArrowDown class="w-3.5 h-3.5 animate-bounce text-pet-lime"></svg>
          </div>
        </div>

        <!-- Social Media Link Buttons -->
        <div class="flex flex-wrap gap-4 md:gap-6 justify-center">
          <a
            *ngFor="let social of socialLinks"
            [href]="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group px-6 py-3.5 bg-slate-800 border-2 border-slate-700 text-slate-300 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:scale-[1.08] hover:-translate-y-1 active:scale-[0.95]"
            [ngClass]="social.color + ' ' + social.borderAccent"
          >
            <ng-container [ngSwitch]="social.icon">
              <svg *ngSwitchCase="'camera'" lucideCamera class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"></svg>
              <svg *ngSwitchCase="'users'" lucideUsers class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"></svg>
              <svg *ngSwitchCase="'video'" lucideVideo class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"></svg>
            </ng-container>
            <span class="text-sm md:text-base">{{social.name}}</span>
            <svg lucideExternalLink class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"></svg>
          </a>
        </div>

        <!-- Divider & Copyright -->
        <div class="w-full border-t border-slate-800 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {{currentYear}} Pet Shop - Spa & Products. Todos os direitos reservados.</p>
          <p class="flex items-center gap-1.5 justify-center">
            Feito com <svg lucideHeart class="w-3.5 h-3.5 text-pet-pink fill-pet-pink animate-pulse"></svg> para os melhores amigos do mundo.
          </p>
        </div>

      </div>
    </footer>
  `,
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(15px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in'))
    ])
  ]
})
export class SocialFooterComponent {
  currentYear = new Date().getFullYear();
  isVisible = false;

  socialLinks = [
    {
      name: "Instagram",
      icon: 'camera',
      url: "https://instagram.com",
      color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
      borderAccent: "hover:shadow-lg hover:shadow-[#E1306C]/20",
    },
    {
      name: "Facebook",
      icon: 'users',
      url: "https://facebook.com",
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      borderAccent: "hover:shadow-lg hover:shadow-[#1877F2]/20",
    },
    {
      name: "YouTube",
      icon: 'video',
      url: "https://youtube.com",
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      borderAccent: "hover:shadow-lg hover:shadow-[#FF0000]/20",
    },
  ];
}

