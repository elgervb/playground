import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticlesComponent } from './particles/particles.component';

const routes: Routes = [
  {
    component: ParticlesComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticlesRoutingModule { }
