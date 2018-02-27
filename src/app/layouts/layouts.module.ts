import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenComponent } from './full-screen/full-screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FullScreenComponent],
  exports: [
    FullScreenComponent
  ]
})
export class LayoutsModule { }
