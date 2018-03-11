import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradientPageComponent } from './containers/gradient-page.component';

const routes: Routes = [
  {
    path: '',
    component: GradientPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradientRoutingModule { }
