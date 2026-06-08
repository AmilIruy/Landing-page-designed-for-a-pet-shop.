import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideX, LucidePhone, LucideMessageSquare, LucideClock, LucideMapPin, LucideSend, LucideCheck } from '@lucide/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, LucideX, LucidePhone, LucideMessageSquare, LucideClock, LucideMapPin, LucideSend, LucideCheck, FormsModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop overlay -->
      <div
        [@fadeIn]
        (click)="onClose.emit()"
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></div>

      <!-- Modal Container -->
      <div
        [@modalAnim]
        class="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border-4 border-pet-lime"
      >
        <!-- Top Colors Decor -->
        <div class="flex h-3 w-full">
          <div class="h-full w-1/3 bg-pet-lime"></div>
          <div class="h-full w-1/3 bg-pet-blue"></div>
          <div class="h-full w-1/3 bg-pet-pink"></div>
        </div>

        <!-- Close Button -->
        <button
          (click)="onClose.emit()"
          class="absolute top-6 right-6 p-2 rounded-full cursor-pointer bg-slate-100 hover:bg-pet-pink hover:text-white text-slate-500 transition-colors duration-200"
        >
          <svg lucideX class="w-5 h-5"></svg>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-5 h-full">
          <!-- Left Info Column -->
          <div class="md:col-span-2 bg-slate-50 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-pet-pink mb-1">
                  Fale Conosco
                </h4>
                <h3 class="text-xl font-bold text-slate-800 tracking-tight">Atendimento</h3>
              </div>

              <div class="space-y-4 text-sm text-slate-600">
                <div class="flex gap-3">
                  <svg lucideMessageSquare class="w-5 h-5 text-pet-blue shrink-0 mt-0.5"></svg>
                  <div>
                    <p class="font-semibold text-slate-800">WhatsApp</p>
                    <p class="text-xs hover:text-pet-pink transition">
                      <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                        (11) 99999-9999
                      </a>
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <svg lucidePhone class="w-5 h-5 text-pet-lime shrink-0 mt-0.5"></svg>
                  <div>
                    <p class="font-semibold text-slate-800">Telefone Fixo</p>
                    <p class="text-xs">(11) 4004-3322</p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <svg lucideMapPin class="w-5 h-5 text-pet-pink shrink-0 mt-0.5"></svg>
                  <div>
                    <p class="font-semibold text-slate-800">Endereço</p>
                    <p class="text-xs">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <svg lucideClock class="w-5 h-5 text-slate-500 shrink-0 mt-0.5"></svg>
                  <div>
                    <p class="font-semibold text-slate-800">Horário de Funcionamento</p>
                    <p class="text-xs">Seg a Sáb: 8h às 19h</p>
                    <p class="text-xs">Dom e Feriados: 9h às 14h</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-200">
               Suporte online em instantes. Retornamos em menos de 10 minutos!
            </div>
          </div>

          <!-- Right Form Column -->
          <div class="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
            <ng-container *ngIf="!isSent; else sentMsg">
              <h3 class="text-xl font-bold text-slate-800 tracking-tight mb-4">
                Envie uma mensagem rápida
              </h3>
              <form (ngSubmit)="handleSubmit()" #contactForm="ngForm" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    [(ngModel)]="msgData.name"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition-colors duration-200 text-slate-800 text-sm"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    [(ngModel)]="msgData.email"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition-colors duration-200 text-slate-800 text-sm"
                    placeholder="Ex: dener@email.com"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    required
                    name="message"
                    [(ngModel)]="msgData.message"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition-colors duration-200 text-slate-800 text-sm h-28 resize-none"
                    placeholder="Diga no que podemos te ajudar..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="!contactForm.form.valid"
                  class="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <svg lucideSend class="w-4 h-4 text-pet-lime"></svg>
                  Enviar Mensagem 🚀
                </button>
              </form>
            </ng-container>

            <ng-template #sentMsg>
              <div
                [@successAnim]
                class="flex flex-col items-center justify-center py-10 text-center"
              >
                <div class="w-16 h-16 bg-pet-lime/20 rounded-full flex items-center justify-center text-slate-800 mb-5 border-2 border-pet-lime">
                  <svg lucideCheck class="w-8 h-8 stroke-[3]"></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">Mensagem Enviada!</h3>
                <p class="text-slate-600 text-sm">
                  Obrigado pelo contato, <strong>{{msgData.name}}</strong>. Nossa equipe entrará em contato em instantes através do e-mail informado.
                </p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalAnim', [
      transition(':enter', [
        style({ scale: 0.95, opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ scale: 1, opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ scale: 0.95, opacity: 0, transform: 'translateY(20px)' }))
      ])
    ]),
    trigger('successAnim', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.8 }),
        animate('400ms ease-out', style({ opacity: 1, scale: 1 }))
      ])
    ])
  ]
})
export class ContactModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  msgData = {
    name: "",
    email: "",
    message: "",
  };
  isSent = false;

  handleSubmit() {
    this.isSent = true;
    setTimeout(() => {
      this.isSent = false;
      this.msgData = { name: "", email: "", message: "" };
      this.onClose.emit();
    }, 2000);
  }
}
