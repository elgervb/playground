import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticlesRoutingModule } from './particles-routing.module';
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  imports: [
    CommonModule,
    ParticlesRoutingModule
  ],
  declarations: [ParticlesComponent]
})
export class ParticlesModule { }
