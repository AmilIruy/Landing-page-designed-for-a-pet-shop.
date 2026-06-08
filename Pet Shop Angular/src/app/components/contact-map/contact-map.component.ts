import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideSend, LucideMapPin, LucideClock, LucideCheckCircle } from '@lucide/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-map',
  standalone: true,
  imports: [CommonModule, LucideSend, LucideMapPin, LucideClock, LucideCheckCircle, FormsModule],
  template: `
    <section class="relative w-full py-20 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      <div class="max-w-6xl mx-auto">
        
        <!-- Section Title -->
        <div class="text-center mb-12 space-y-2">
          <span class="text-xs font-black uppercase tracking-widest text-pet-lime">
            FALE COM NOSSO TIME
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Contato & Localização 📍
          </h2>
          <p class="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            Tem alguma dúvida ou gostaria de solicitar algum orçamento ou atendimento especial? Envie uma mensagem! Estamos prontos para ajudar.
          </p>
        </div>

        <!-- Content Box -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <!-- Left Panel: Email Contact Form -->
          <div class="lg:col-span-6 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md flex flex-col justify-between">
            <div class="space-y-6">
              <div class="border-b border-slate-200 pb-4">
                <h3 class="text-xl font-bold text-slate-800">Mande seu Recado</h3>
                <p class="text-xs text-slate-500 mt-1">
                   Receba uma resposta de nossos cuidadores em até 1 hora útil!
                </p>
              </div>

              <ng-container *ngIf="!success; else successMsg">
                <form (ngSubmit)="handleSubmit()" #contactForm="ngForm" class="space-y-4">
                  <!-- Name -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      [(ngModel)]="formData.name"
                      placeholder="Ex: Seu Nome"
                      class="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition duration-200 text-slate-800 text-sm"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Endereço de E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      [(ngModel)]="formData.email"
                      placeholder="Ex: joao@gmail.com"
                      class="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition duration-200 text-slate-800 text-sm"
                    />
                  </div>

                  <!-- Subject selector -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Assunto Principal
                    </label>
                    <select
                      name="subject"
                      [(ngModel)]="formData.subject"
                      class="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition duration-200 text-slate-800 text-sm cursor-pointer"
                    >
                      <option value="Dúvidas Gerais">Dúvidas Gerais / Consultas</option>
                      <option value="Novos Produtos">Estoque de Produtos Premium</option>
                      <option value="Parcerias">Parcerias e Negócios</option>
                      <option value="Suporte Técnico">Suporte com o Agendador</option>
                    </select>
                  </div>

                  <!-- Message -->
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Sua Mensagem *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows="4"
                      [(ngModel)]="formData.message"
                      placeholder="Escreva sobre suas necessidades, pet ou dúvidas..."
                      class="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl focus:border-pet-pink outline-none transition duration-200 text-slate-800 text-sm resize-none"
                    ></textarea>
                  </div>

                  <!-- Button -->
                  <button
                    type="submit"
                    [disabled]="loading || !contactForm.form.valid"
                    class="w-full py-3 bg-pet-pink hover:bg-pet-pink/90 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-pet-pink/10 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <ng-container *ngIf="loading; else btnContent">
                      <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </ng-container>
                    <ng-template #btnContent>
                      <svg lucideSend class="w-4 h-4 text-pet-lime"></svg>
                      Enviar E-mail de Contato ✨
                    </ng-template>
                  </button>
                </form>
              </ng-container>
              
              <ng-template #successMsg>
                <div
                  [@successAnim]
                  class="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div class="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-400">
                    <svg lucideCheckCircle class="w-8 h-8"></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-800 mb-2">Mensagem Enviada!</h3>
                  <p class="text-slate-600 text-xs px-4">
                     Recebemos seu contato com sucesso. Fique de olho na sua caixa de entrada; responderemos em instantes.
                  </p>
                </div>
              </ng-template>
            </div>
          </div>

          <!-- Right Panel: Embedded Map -->
          <div class="lg:col-span-6 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md flex flex-col justify-between">
            <div class="h-full flex flex-col justify-between space-y-6">
              
              <div class="border-b border-slate-200 pb-4">
                <h3 class="text-xl font-bold text-slate-800">Nossa Localização</h3>
                <p class="text-xs text-slate-500 mt-1">
                   Venha nos visitar! Estacionamento gratuito exclusivo no local.
                </p>
              </div>

              <!-- Map Holder -->
              <div class="relative w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden border-4 border-white shadow-md bg-slate-200">
                <iframe
                  src="https://maps.google.com/maps?q=Av.+Paulista,+1000+-+Bela+Vista,+S%C3%A3o+Paulo+-+SP,+01311-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style="border: 0"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  title="Google Maps Pet Shop"
                  class="absolute inset-0"
                ></iframe>
              </div>

              <!-- Direct Details Row -->
              <div class="grid grid-cols-2 gap-4 text-xs pt-2">
                <div class="flex gap-2.5 items-start">
                  <svg lucideMapPin class="w-4 h-4 text-pet-pink shrink-0"></svg>
                  <div>
                    <p class="font-bold text-slate-700">Endereço</p>
                    <p class="text-slate-500">Av. Paulista, 1000 - SP</p>
                  </div>
                </div>

                <div class="flex gap-2.5 items-start">
                  <svg lucideClock class="w-4 h-4 text-pet-blue shrink-0"></svg>
                  <div>
                    <p class="font-bold text-slate-700">Segunda a Sábado</p>
                    <p class="text-slate-500">8h - 19h (Domingos até 14h)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  animations: [
    trigger('successAnim', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.9 }),
        animate('300ms ease-out', style({ opacity: 1, scale: 1 }))
      ])
    ])
  ]
})
export class ContactMapComponent {
  formData = {
    name: "",
    email: "",
    subject: "Dúvidas Gerais",
    message: "",
  };
  loading = false;
  success = false;

  handleSubmit() {
    this.loading = true;

    // Simulate sending email to backend
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      
      // Save to localStorage
      const submissions = JSON.parse(localStorage.getItem("email_messages") || "[]");
      submissions.push({
        id: "msg_" + Date.now(),
        ...this.formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem("email_messages", JSON.stringify(submissions));

      // Reset form
      this.formData = {
        name: "",
        email: "",
        subject: "Dúvidas Gerais",
        message: "",
      };

      // Reset success state after a few seconds
      setTimeout(() => this.success = false, 3000);
    }, 1500);
  }
}
