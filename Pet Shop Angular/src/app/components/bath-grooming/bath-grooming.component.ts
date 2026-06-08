import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSparkles, LucideCalendar, LucideShieldCheck, LucideHeart } from '@lucide/angular';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { PawIconComponent } from '../paw-icon/paw-icon.component';

@Component({
  selector: 'app-bath-grooming',
  standalone: true,
  imports: [CommonModule, LucideSparkles, LucideCalendar, LucideShieldCheck, LucideHeart, PawIconComponent],
  template: `
    <section class="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      <!-- Massive Watermark Page Background Paw Print -->
      <div class="absolute -right-24 md:-right-40 top-[-50px] w-80 h-80 md:w-[600px] md:h-[600px] select-none pointer-events-none opacity-[0.08] text-pet-blue z-0">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        <!-- Left Side: Benefits text and Booking Button -->
        <div class="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
          <div
            [@slideInLeft]
            class="space-y-6"
          >
            <div class="space-y-2">
              <span class="text-xs font-black uppercase tracking-widest text-pet-blue">
                MIMO & CUIDADO PROFISSIONAL
              </span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Os benefícios do nosso <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-pet-blue to-pet-pink">
                  Banho & Tosa Exclusivos
                </span>
              </h2>
              <p class="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
                Mais do que estética, a rotina de limpeza é essencial para a saúde física e mental do seu pet. 
                Nossos profissionais são focados na técnica do reforço positivo, garantindo um banho relaxante e livre de estresse!
              </p>
            </div>

            <!-- Benefits List -->
            <div class="space-y-5">
              <div
                *ngFor="let benefit of benefits; let i = index"
                [@fadeInUp]="{ value: '', params: { delay: i * 150 + 'ms' } }"
                class="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition duration-200 border border-transparent hover:border-slate-100"
              >
                <div class="p-2.5 rounded-xl bg-white shadow-sm border border-slate-100">
                  <ng-container [ngSwitch]="benefit.icon">
                    <svg *ngSwitchCase="'heart'" lucideHeart [class]="'w-5 h-5 ' + benefit.iconColor"></svg>
                    <svg *ngSwitchCase="'shield-check'" lucideShieldCheck [class]="'w-5 h-5 ' + benefit.iconColor"></svg>
                    <svg *ngSwitchCase="'sparkles'" lucideSparkles [class]="'w-5 h-5 ' + benefit.iconColor"></svg>
                  </ng-container>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm md:text-base mb-1">
                    {{benefit.title}}
                  </h4>
                  <p class="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {{benefit.description}}
                  </p>
                </div>
              </div>
            </div>

            <!-- Scheduling Button below text -->
            <div class="pt-4">
              <button
                (click)="onOpenBooking.emit()"
                class="group px-8 py-4 bg-pet-pink hover:bg-pet-pink/90 text-white rounded-2xl font-black text-sm md:text-base shadow-lg shadow-pet-pink/20 hover:shadow-xl shadow-pet-pink/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all flex items-center gap-3"
              >
                <svg lucideCalendar class="w-5 h-5 text-pet-lime group-hover:scale-110 transition-transform"></svg>
                Agendar Horário na Agenda ✨
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div class="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 z-10">
          <!-- Decorative Backgound Paw Drawing -->
          <div class="absolute w-80 h-80 md:w-[420px] md:h-[420px] -translate-y-8 md:-translate-y-12 select-none pointer-events-none z-0">
            <app-paw-icon color="#3cbff0" className="w-full h-full opacity-25"></app-paw-icon>
          </div>

          <!-- Glowing colorful aura -->
          <div class="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-tr from-pet-blue/30 via-pet-lime/20 to-transparent blur-3xl pointer-events-none z-0"></div>

          <!-- Dog Image -->
          <div
            [@imageAnim]
            class="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-8 border-white shadow-2xl hover:scale-105 duration-300 group cursor-pointer z-10"
          >
            <div class="absolute top-4 right-4 bg-pet-pink text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full z-20 shadow-md">
              MUITO CHEIROSO! 🌸
            </div>

            <img
              src="assets/images/happy_wet_dog_1780752150189.png"
              alt="Cachorro fofinho feliz pós-banho"
              referrerPolicy="no-referrer"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  `,
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('500ms {{delay}} ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: '0ms' } })
    ]),
    trigger('imageAnim', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.85, rotate: '3deg' }),
        animate('700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, scale: 1, rotate: '0deg' }))
      ])
    ])
  ]
})
export class BathGroomingComponent {
  @Output() onOpenBooking = new EventEmitter<void>();

  benefits = [
    {
      title: "Pele e Pelagem Saudável",
      description: "Remove pelos mortos de forma indolor, prevenindo nós acumulados e ativando os óleos naturais protetores.",
      icon: 'heart',
      iconColor: "text-pet-pink",
    },
    {
      title: "Prevenção Ativa de Alergias",
      description: "O uso de produtos dermatologicamente testados protege a barreira cutânea contra infecções e fungos.",
      icon: 'shield-check',
      iconColor: "text-pet-blue",
    },
    {
      title: "Higiene Completa dos Ouvidos e Unhas",
      description: "Limpamos as orelhas com loções calmantes e cortamos as unhas de forma segura, reduzindo desconfortos.",
      icon: 'sparkles',
      iconColor: "text-pet-lime",
    },
  ];
}
