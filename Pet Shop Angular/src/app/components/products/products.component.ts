import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideShoppingBag, LucideMessageCircle } from '@lucide/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { PawIconComponent } from '../paw-icon/paw-icon.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, LucideShoppingBag, LucideMessageCircle, PawIconComponent],
  template: `
    <section class="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      <!-- Massive Watermark Page Background Paw Print -->
      <div class="absolute -left-24 md:-left-40 top-[-50px] w-80 h-80 md:w-[600px] md:h-[600px] select-none pointer-events-none opacity-[0.08] text-pet-pink z-0">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <!-- Decorative colored blobs -->
      <div class="absolute -top-12 right-12 w-80 h-80 rounded-full bg-pet-lime/10 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 -left-12 w-80 h-80 rounded-full bg-pet-pink/5 blur-3xl pointer-events-none"></div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        <!-- Left Side: Product image -->
        <div class="lg:col-span-5 relative flex items-center justify-center z-10">
          
          <!-- Decorative Backgound Paw Drawing -->
          <div class="absolute w-80 h-80 md:w-[420px] md:h-[420px] -translate-y-8 md:-translate-y-12 select-none pointer-events-none z-0 text-pet-pink">
            <app-paw-icon className="w-full h-full opacity-25"></app-paw-icon>
          </div>
          
          <!-- Accent glowing sphere -->
          <div class="absolute w-64 h-64 rounded-full bg-pet-lime/20 blur-3xl pointer-events-none z-0"></div>

          <!-- Core image -->
          <div
            [@imageAnim]
            class="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-8 border-white bg-white shadow-2xl hover:scale-105 duration-300 group cursor-pointer z-10"
          >
            <div class="absolute top-4 left-4 bg-pet-lime text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-full z-20 shadow-md border border-white flex items-center gap-1">
              <svg lucideShoppingBag class="w-3.5 h-3.5"></svg>
              PRODUTOS PREMIUM
            </div>

            <img
              src="assets/images/kitty_eating_food_1780752163274.png"
              alt="Gatinho comendo ração premium do petshop"
              referrerPolicy="no-referrer"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        <!-- Right Side: Text and Categories -->
        <div class="lg:col-span-7 flex flex-col justify-center text-left">
          <div
            [@slideInRight]
            class="space-y-6"
          >
            <div class="space-y-2">
              <span class="text-xs font-black uppercase tracking-widest text-pet-pink">
                ALIMENTAÇÃO & ACESSÓRIOS LUXO
              </span>
              <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Os melhores produtos para a <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-pet-pink to-pet-lime">
                  nutrição e alegria do seu pet
                </span>
              </h2>
              <p class="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
                Cuidar da saúde por dentro e por fora! Oferecemos uma curadoria especial de rações, brinquedos e cosméticos selecionados a dedo. Garantia de bem-estar absoluto para cães e gatos.
              </p>
            </div>

            <!-- List describing product areas -->
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div
                *ngFor="let cat of categories"
                class="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:border-pet-lime/50 transition duration-200"
              >
                <h4 class="font-bold text-slate-800 text-sm md:text-base mb-1 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-pet-lime shrink-0"></span>
                  {{cat.title}}
                </h4>
                <p class="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {{cat.description}}
                </p>
              </div>
            </div>

            <!-- Contact Button under text -->
            <div class="pt-4">
              <button
                (click)="onOpenContact.emit()"
                class="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm md:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all flex items-center gap-3"
              >
                <svg lucideMessageCircle class="w-5 h-5 text-pet-lime group-hover:scale-110 transition-transform"></svg>
                Consultar Disponibilidade de Produtos
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('imageAnim', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.85, rotate: '-3deg' }),
        animate('700ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, scale: 1, rotate: '0deg' }))
      ])
    ])
  ]
})
export class ProductsComponent {
  @Output() onOpenContact = new EventEmitter<void>();

  categories = [
    {
      title: "Rações Super Premium",
      description: "Trabalhamos com marcas selecionadas, ricas em proteínas nobres e ômega-3 para pelos fortes e brilhantes.",
    },
    {
      title: "Brinquedos Inteligentes",
      description: "Acessórios interativos que estimulam o raciocínio cognitivo, reduzem a ansiedade e mantêm seu pet ativo.",
    },
    {
      title: "Cosméticos Hipoalergênicos",
      description: "Fórmulas exclusivas sem sulfato, com queratina e óleos botânicos que não ardem e acalmam a pele sensível.",
    },
  ];
}
