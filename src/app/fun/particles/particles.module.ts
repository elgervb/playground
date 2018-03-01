import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ParticlesRoutingModule } from './particles-routing.module';
import { ParticlesComponent } from './particles/particles.component';
import { LayoutsModule } from '../../layouts/layouts.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    ParticlesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParticlesComponent, SettingsComponent]
})
export class ParticlesModule { }
