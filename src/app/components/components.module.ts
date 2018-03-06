import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutComponent } from './donut/donut.component';
import { ListComponent } from './list/list.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DonutComponent,
    ListComponent,
    ListFilterComponent,
    ProgressbarComponent
  ],
  exports: [
    DonutComponent,
    ListComponent,
    ListFilterComponent,
    ProgressbarComponent
  ]
})
export class ComponentsModule { }
