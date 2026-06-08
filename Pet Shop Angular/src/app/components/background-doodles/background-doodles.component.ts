import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PawIconComponent } from '../paw-icon/paw-icon.component';

@Component({
  selector: 'app-background-doodles',
  standalone: true,
  imports: [CommonModule, PawIconComponent],
  template: `
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <!-- Yarn 1: Top Hero -> Left Border to Right Border (Pink #e72585) -->
      <svg
        class="absolute top-[6%] left-0 w-full h-[360px] opacity-25 text-pet-pink pointer-events-none"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,100 C 300,340 600,-60 900,200 C 1100,320 1300,100 1440,150"
          stroke="currentColor"
          stroke-width="3"
          stroke-dasharray="8,8"
          stroke-linecap="round"
        />
        <circle cx="1435" cy="150" r="5" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3" />
      </svg>

      <!-- Yarn 2: BathGrooming -> Left Border looping back to Left Border (Lime #d2d700) -->
      <svg
        class="absolute top-[23%] left-0 w-full h-[400px] opacity-30 text-pet-lime pointer-events-none"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,80 C 400,380 800,20 600,340 C 450,420 200,240 0,320"
          stroke="currentColor"
          stroke-width="3.5"
          stroke-dasharray="8,8"
          stroke-linecap="round"
        />
        <circle cx="5" cy="320" r="5" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3" />
      </svg>

      <!-- Yarn 3: Products -> Right Border to Left Border (Blue #3cbff0) -->
      <svg
        class="absolute top-[44%] left-0 w-full h-[380px] opacity-25 text-pet-blue pointer-events-none"
        viewBox="0 0 1440 380"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 1440,120 C 1100,320 800,-40 700,180 C 550,330 250,120 0,220"
          stroke="currentColor"
          stroke-width="3.5"
          stroke-dasharray="9,9"
          stroke-linecap="round"
        />
      </svg>

      <!-- Yarn 4: Near social -> Right Border looping back to Right Border (Pink #e72585) -->
      <svg
        class="absolute top-[65%] left-0 w-full h-[420px] opacity-25 text-pet-pink pointer-events-none"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 1440,100 C 900,380 750,40 1000,250 C 1150,350 1300,150 1440,320"
          stroke="currentColor"
          stroke-width="3"
          stroke-dasharray="8,8"
          stroke-linecap="round"
        />
        <circle cx="1435" cy="320" r="5" stroke="currentColor" stroke-width="2" />
      </svg>

      <!-- Yarn 5: Near map -> Left Border to Right Border (Lime #d2d700) -->
      <svg
        class="absolute top-[82%] left-0 w-full h-[350px] opacity-30 text-pet-lime pointer-events-none"
        viewBox="0 0 1440 350"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,180 C 350,50 700,320 1050,120 C 1200,30 1350,240 1440,150"
          stroke="currentColor"
          stroke-width="3"
          stroke-dasharray="8,8"
          stroke-linecap="round"
        />
      </svg>

      <!-- HERO PAWS -->
      <div class="absolute top-[3%] left-[4%] w-10 h-10 opacity-20 rotate-[-15deg] text-pet-pink">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>
      
      <div class="absolute top-[10%] right-[5%] w-12 h-12 opacity-20 rotate-[25deg] text-pet-blue">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[21%] left-[8%] w-12 h-12 opacity-20 rotate-[40deg] text-pet-lime">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>
      <div class="absolute top-[23%] left-[12%] w-10 h-10 opacity-15 rotate-[60deg] text-pet-lime">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[35%] right-[5%] w-14 h-14 opacity-20 rotate-[-20deg] text-pet-pink">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[49%] left-[6%] w-12 h-12 opacity-20 rotate-[45deg] text-pet-blue">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[59%] right-[8%] w-11 h-11 opacity-20 rotate-[-30deg] text-pet-lime">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[71%] left-[10%] w-14 h-14 opacity-25 rotate-[55deg] text-pet-pink">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>
      <div class="absolute top-[73%] left-[6%] w-10 h-10 opacity-15 rotate-[30deg] text-pet-pink">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>

      <div class="absolute top-[85%] right-[6%] w-12 h-12 opacity-20 rotate-[-15deg] text-pet-blue">
        <app-paw-icon className="w-full h-full"></app-paw-icon>
      </div>
    </div>
  `
})
export class BackgroundDoodlesComponent {}
