import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../../layouts/layouts.module';

import { GradientRoutingModule } from './gradient-routing.module';
import { GradientPageComponent } from './containers/gradient-page.component';

@NgModule({
  imports: [
    CommonModule,
    GradientRoutingModule,
    LayoutsModule
  ],
  declarations: [GradientPageComponent]
})
export class GradientModule { }
