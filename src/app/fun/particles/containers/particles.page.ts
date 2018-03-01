import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Particle, defaultCanvasSettings, defaultParticleSettings } from '../models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import * as fromParticles from '../reducers';
import * as particles from '../actions/particles.actions';

@Component({
  selector: 'evb-particles',
  template: `
    <evb-full-screen>
      <evb-settings></evb-settings>
      <evb-canvas [particles]="particles$|async"></evb-canvas>
    </evb-full-screen>
  `,
  styleUrls: ['./particles.page.scss']
})
export class ParticlesPageComponent implements OnInit {

  canvasSettings = defaultCanvasSettings;

  private particles$: Observable<Particle[]>;
  private particles: Particle[];

  constructor(private store: Store<fromParticles.State>) {
    this.particles$ = store.pipe(select(fromParticles.getAllParticles))
  }

  ngOnInit() {
    this.create(this.canvasSettings.number);
    this.particles$.subscribe(particles => this.particles = [...particles.map(particle => ({...particle}))]);
  }

  create(number: number) {
    this.store.dispatch(new particles.Create(number, window.innerWidth, window.innerHeight));
  }

}
