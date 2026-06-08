import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideX, LucideSmile, LucideCheck, LucideSparkles } from '@lucide/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../types';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, LucideX, LucideSmile, LucideCheck, LucideSparkles, FormsModule],
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
        class="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border-4 border-pet-blue"
      >
        <!-- Theme Stripes -->
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

        <!-- Modal Body -->
        <div class="p-6 md:p-8">
          <ng-container *ngIf="!isSuccess; else successMsg">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-1">
                <svg lucideSparkles class="w-5 h-5 text-pet-pink"></svg>
                <span class="text-xs font-bold uppercase tracking-wider text-pet-pink">
                  SPA EXCLUSIVO
                </span>
              </div>
              <h3 class="text-2xl font-bold text-slate-800 tracking-tight">
                Agendar Banho & Tosa
              </h3>
              <p class="text-slate-500 text-sm mt-1">
                 Reserve o melhor horário para o mimo de quem você mais ama!
              </p>
            </div>

            <form (ngSubmit)="handleSubmit()" #bookingForm="ngForm" class="space-y-4">
              <!-- Services Choice -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Escolha o Serviço
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    *ngFor="let srv of services"
                    type="button"
                    (click)="formData.service = srv"
                    class="py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer"
                    [ngClass]="formData.service === srv ? 'bg-pet-pink text-white border-pet-pink shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-pet-pink/40 hover:bg-slate-50'"
                  >
                    {{srv === "Banho e Tosa" ? "Completo ✨" : srv}}
                  </button>
                </div>
              </div>

              <!-- Pet Details -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nome do Pet *
                  </label>
                  <input
                    type="text"
                    required
                    name="petName"
                    [(ngModel)]="formData.petName"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm"
                    placeholder="Ex: Floquinho"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Tipo de Pet
                  </label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      *ngFor="let type of petTypes"
                      type="button"
                      (click)="formData.petType = type"
                      class="py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all"
                      [ngClass]="formData.petType === type ? 'bg-pet-blue text-white border-pet-blue shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
                    >
                      {{type}}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Pet Size and Contact -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Tamanho do Pet
                  </label>
                  <select
                    name="petSize"
                    [(ngModel)]="formData.petSize"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue bg-white focus:bg-white outline-none transition-colors duration-200 text-slate-800 text-sm cursor-pointer"
                  >
                    <option value="Pequeno">Pequeno (até 10kg)</option>
                    <option value="Médio">Médio (10 a 25kg)</option>
                    <option value="Grande">Grande (acima de 25kg)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    name="clientName"
                    [(ngModel)]="formData.clientName"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm"
                    placeholder="Ex: Yuri Caciole"
                  />
                </div>
              </div>

              <!-- Contact Phone & Date/Time -->
              <div class="grid grid-cols-3 gap-2">
                <div class="col-span-1">
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="clientPhone"
                    [(ngModel)]="formData.clientPhone"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Data *
                  </label>
                  <input
                    type="date"
                    required
                    name="date"
                    [min]="today"
                    [(ngModel)]="formData.date"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Horário *
                  </label>
                  <input
                    type="time"
                    required
                    name="time"
                    [(ngModel)]="formData.time"
                    class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm"
                  />
                </div>
              </div>

              <!-- Extra Notes -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Observações Especiais (Ex: alergia a shampoo)
                </label>
                <textarea
                  name="notes"
                  [(ngModel)]="formData.notes"
                  class="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-pet-blue outline-none transition-colors duration-200 text-slate-800 text-sm h-16 resize-none"
                  placeholder="Algum cuidado especial para seu pet?"
                ></textarea>
              </div>

              <!-- Buttons -->
              <div class="flex gap-2 pt-2">
                <button
                  type="button"
                  (click)="onClose.emit()"
                  class="flex-1 py-3 px-4 border-2 border-slate-200 hover:bg-slate-50 rounded-2xl font-bold text-slate-600 cursor-pointer text-sm transition-all text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  [disabled]="!bookingForm.form.valid"
                  class="flex-1 py-3 px-4 bg-pet-pink hover:bg-pet-pink/90 text-white rounded-2xl font-bold shadow-lg shadow-pet-pink/20 hover:shadow-pet-pink/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Agendamento ✨
                </button>
              </div>
            </form>
          </ng-container>

          <ng-template #successMsg>
            <div
              [@successAnim]
              class="flex flex-col items-center justify-center py-12 text-center"
            >
              <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-md border-2 border-emerald-400">
                <svg lucideCheck class="w-10 h-10 stroke-[3]"></svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-2"> Agendado com Sucesso!</h3>
              <p class="text-slate-600 max-w-sm mb-4">
                Obrigado <strong>{{formData.clientName}}</strong>! O horário de {{formData.service}} para o 
                <strong>{{formData.petName}}</strong> foi reservado para o dia <strong>{{formatDate(formData.date)}}</strong> às 
                <strong>{{formData.time}}</strong>.
              </p>
              <p class="text-xs bg-slate-100 text-slate-500 py-2 px-4 rounded-full mt-2 flex items-center gap-2">
                <svg lucideSmile class="w-4 h-4 text-pet-blue"></svg>
                Enviamos as orientações de confirmação para seu WhatsApp!
              </p>
            </div>
          </ng-template>
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
export class BookingModalComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onAddBooking = new EventEmitter<Appointment>();

  formData = {
    clientName: "",
    clientPhone: "",
    petName: "",
    petType: "Cachorro" as "Cachorro" | "Gato",
    petSize: "Médio" as "Pequeno" | "Médio" | "Grande",
    service: "Banho e Tosa" as "Banho" | "Tosa" | "Banho e Tosa",
    date: "",
    time: "",
    notes: "",
  };

  isSuccess = false;
  today = new Date().toISOString().split("T")[0];
  services = ["Banho", "Tosa", "Banho e Tosa"] as const;
  petTypes = ["Cachorro", "Gato"] as const;

  handleSubmit() {
    const newAppointment: Appointment = {
      id: "appt_" + Date.now(),
      ...this.formData,
      status: "Confirmado",
      createdAt: new Date().toISOString(),
    };

    this.onAddBooking.emit(newAppointment);
    this.isSuccess = true;
    
    setTimeout(() => {
      this.isSuccess = false;
      this.onClose.emit();
      // Reset form
      this.formData = {
        clientName: "",
        clientPhone: "",
        petName: "",
        petType: "Cachorro",
        petSize: "Médio",
        service: "Banho e Tosa",
        date: "",
        time: "",
        notes: "",
      };
    }, 2500);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return "";
    return dateStr.split("-").reverse().join("/");
  }
}
