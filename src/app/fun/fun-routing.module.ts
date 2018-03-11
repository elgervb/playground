import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunComponent } from './fun.component';

const routes: Routes = [
  {
    path: '',
    component: FunComponent,
    children: [
      {
        path: 'particles',
        loadChildren: 'app/fun/particles/particles.module#ParticlesModule'
      }, {
        path: 'gradient',
        loadChildren: 'app/fun/gradient/gradient.module#GradientModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunRoutingModule { }
