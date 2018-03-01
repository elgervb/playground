import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticlesPageComponent } from './containers/particles.page';

const routes: Routes = [
  {
    component: ParticlesPageComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticlesRoutingModule { }
