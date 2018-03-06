import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Particle, defaultCanvasSettings, defaultParticleSettings } from '../models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { CanvasComponent } from '../components/canvas/canvas.component';
import * as fromParticles from '../reducers';
import * as particles from '../actions/particles.actions';

@Component({
  selector: 'evb-particles',
  template: `
    <evb-full-screen>
      <evb-settings (onAdd)="create($event)" (onDelete)="remove()"></evb-settings>
      <evb-canvas [particles]="particles$|async"></evb-canvas>
    </evb-full-screen>
  `,
  styleUrls: ['./particles.page.scss']
})
export class ParticlesPageComponent implements AfterViewInit {

  @ViewChild(CanvasComponent) canvas: CanvasComponent
  canvasSettings = defaultCanvasSettings;

  private particles$: Observable<Particle[]>;
  private particles: Particle[];

  constructor(private store: Store<fromParticles.State>) {
    this.particles$ = store.pipe(select(fromParticles.getAllParticles));
    this.particles$.subscribe(particles => this.particles = [...particles.map(particle => ({...particle}))]);
  }

  ngAfterViewInit() {
    // setTimeout(() =>
    //   this.particles$.subscribe(particles => this.particles = [...particles.map(particle => ({...particle}))]),
    //   0);
    this.create(this.canvasSettings.number);
  }

  create(number: number) {
    this.storeAll();

    // and then we can create a new one
    this.store.dispatch(new particles.Create(number, window.innerWidth, window.innerHeight));
  }

  remove() {
    this.storeAll();

    const particle = this.particles[this.particles.length - 1];
    this.store.dispatch(new particles.Delete(particle));
  }

  private storeAll() {
    // we need to store current state, otherwise the screen will revert to it initial state
    // this is because we make changes on state in canvas element
    this.store.dispatch(new particles.UpdateAll(this.canvas.particles.map(particle => {
      return {
        id: particle.id,
        changes: {...particle}
      }
    })));
  }

}
