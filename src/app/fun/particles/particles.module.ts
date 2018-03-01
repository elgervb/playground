import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ParticlesRoutingModule } from './particles-routing.module';
import { ParticlesPageComponent } from './containers/particles.page';
import { LayoutsModule } from '../../layouts/layouts.module';
import { SettingsComponent } from './components/settings.component';
import { reducers } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    ParticlesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('particles', reducers),
  ],
  declarations: [ParticlesPageComponent, SettingsComponent]
})
export class ParticlesModule { }
