import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticlesRoutingModule } from './particles-routing.module';
import { ParticlesComponent } from './particles/particles.component';
import { LayoutsModule } from '../../layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    ParticlesRoutingModule
  ],
  declarations: [ParticlesComponent]
})
export class ParticlesModule { }
