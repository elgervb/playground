import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../../layouts/layouts.module';

import { GradientRoutingModule } from './gradient-routing.module';
import { GradientPageComponent } from './containers/gradient-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GradientRoutingModule,
    LayoutsModule,
    ReactiveFormsModule
  ],
  declarations: [GradientPageComponent]
})
export class GradientModule { }
