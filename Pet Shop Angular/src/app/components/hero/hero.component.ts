import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSparkles, LucideMessageCircle, LucideHeart, LucideShield } from '@lucide/angular';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideSparkles, LucideMessageCircle, LucideHeart, LucideShield],
  template: `
    <section class="relative min-h-[80vh] flex flex-col items-center justify-start bg-transparent overflow-hidden pt-2 md:pt-4 pb-12 px-4 md:px-8 border-b-8 border-double border-slate-100">
      <!-- Decorative Grid and Background shapes -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3cbff0_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pet-blue/10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-pet-pink/5 blur-3xl pointer-events-none"></div>

      <!-- Main Content -->
      <div class="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10">
        <!-- Center Logo in the exact middle with beautiful motion -->
        <div
          [@logoAnim]
          class="relative group -mb-2 md:-mb-4"
        >
          <!-- Container for the logo with backing gradient -->
          <div class="relative w-72 h-72 md:w-[310px] md:h-[310px] flex items-center justify-center">
            <!-- Elegant soft backdrop gradient behind the logo -->
            <div class="absolute w-[85%] h-[85%] bg-gradient-to-tr from-pet-lime via-pet-blue to-pet-pink rounded-full opacity-45 blur-2xl group-hover:scale-110 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>
            <div class="absolute w-[65%] h-[65%] bg-gradient-to-r from-pet-blue via-pet-pink to-pet-lime rounded-full opacity-35 blur-xl group-hover:scale-[1.15] transition duration-500 pointer-events-none"></div>
            
            <!-- Main logo image -->
            <img
              src="assets/images/lg-t1.svg"
              alt="Logo do Pet Shop"
              referrerPolicy="no-referrer"
              class="relative w-full h-full object-contain transform group-hover:scale-105 transition duration-300 pointer-events-none z-10"
            />
          </div>
        </div>

        <!-- Catchy Slogan -->
        <h1
          [@fadeInUp]="{ value: '', params: { delay: '300ms' } }"
          class="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight max-w-3xl"
        >
          Amor, cuidado e muito <br class="hidden sm:inline" />
          <span class="relative inline-block mt-1">
            <span class="absolute -bottom-2 inset-x-0 h-4 bg-pet-lime/50 -skew-y-1"></span>
            <span class="relative text-transparent bg-clip-text bg-gradient-to-r from-pet-pink to-pet-blue">
              estilo para o seu pet!
            </span>
          </span>
        </h1>

        <!-- Explanatory description -->
        <p
          [@fadeInUp]="{ value: '', params: { delay: '400ms' } }"
          class="text-base sm:text-lg text-slate-600 max-w-2xl mt-4 md:mt-5 leading-relaxed"
        >
          Aqui nossa missão é fazer seu pet se sentir em um verdadeiro SPA de luxo. 
          Banhos refrescantes, tosa personalizada e produtos de qualidade premium em um só lugar.
        </p>

        <!-- Centered Contact Button -->
        <div
          [@fadeInUp]="{ value: '', params: { delay: '500ms' } }"
          class="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 w-full justify-center px-4"
        >
          <button
            (click)="onOpenContact.emit()"
            class="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all flex items-center justify-center gap-3 text-base"
          >
            <svg lucideMessageCircle class="w-5 h-5 text-pet-lime group-hover:rotate-12 transition-transform duration-200"></svg>
            Entre em Contato Agora
          </button>
        </div>

        <!-- Micro Badges of Trust -->
        <div
          [@fadeIn]="{ value: '', params: { delay: '700ms' } }"
          class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-12 max-w-xl mx-auto text-xs font-bold text-slate-500 uppercase tracking-widest border-t border-slate-100 pt-6"
        >
          <div class="flex items-center gap-2 justify-center col-span-1">
            <svg lucideHeart class="w-4 h-4 text-pet-pink shrink-0"></svg>
            <span>Mimos e Amor</span>
          </div>
          <div class="flex items-center gap-2 justify-center col-span-1">
            <svg lucideShield class="w-4 h-4 text-pet-blue shrink-0"></svg>
            <span>Veterinários Próximos</span>
          </div>
          <div class="flex items-center gap-2 justify-center col-span-2 md:col-span-1">
            <svg lucideSparkles class="w-4 h-4 text-pet-lime shrink-0"></svg>
            <span>Tosa Especializada</span>
          </div>
        </div>
      </div>

      <!-- Absolute Bottom Indicator -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none">
        <span class="text-[10px] tracking-widest uppercase font-bold text-slate-400">Arraste para explorar</span>
        <div class="w-1.5 h-3 bg-slate-300 rounded-full animate-bounce mt-1"></div>
      </div>
    </section>
  `,
  animations: [
    trigger('logoAnim', [
      transition(':enter', [
        style({ scale: 0.7, opacity: 0 }),
        animate('500ms 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ scale: 1, opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('700ms {{delay}} ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: '0ms' } })
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms {{delay}} ease-out', style({ opacity: 1 }))
      ], { params: { delay: '0ms' } })
    ])
  ]
})
export class HeroComponent {
  @Output() onOpenContact = new EventEmitter<void>();
}
