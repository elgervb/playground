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
      <evb-settings [canvasSettings]="canvasSettings"></evb-settings>
      <canvas #canvas class="particles__canvas"></canvas>
    </evb-full-screen>
  `,
  styleUrls: ['./particles.page.scss']
})
export class ParticlesPageComponent implements OnInit {

  @ViewChild('canvas') private canvasElement: ElementRef;

  canvasSettings = defaultCanvasSettings;

  private context: CanvasRenderingContext2D;
  private particles$: Observable<Particle[]>;
  private particles: Particle[];

  constructor(private store: Store<fromParticles.State>) {
    this.particles$ = store.pipe(select(fromParticles.getAllParticles))
  }

  ngOnInit() {
    this.context = (this.canvasElement.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasElement.nativeElement.height = window.innerHeight;
    this.canvasElement.nativeElement.width = window.innerWidth;

    for(var i = 0; i < this.canvasSettings.number; i++) {
      this.add(this.createParticle());
    }
    this.particles$.subscribe(particles => this.particles = [...particles.map(particle => ({...particle}))]);

    Observable.interval(33).subscribe(this.draw.bind(this));
  }

  add(particle: Particle) {
    this.store.dispatch(new particles.AddOne(particle));
  }

  draw() {
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "rgba(52, 55, 60, "+ this.canvasSettings.trail+")";
    this.context.fillRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    this.context.globalCompositeOperation = "lighter";

    if (this.particles) {
      debugger;
      this.particles.forEach(particle => this.drawParticle(particle));
    }
  }

  private createParticle(): Particle {
    const width = this.canvasElement.nativeElement.width;
    const height = this.canvasElement.nativeElement.height;

    // radius
    const radius = Math.random()*defaultParticleSettings.particleMaxWidth+defaultParticleSettings.particleMinWidth;
    // position
    const x = Math.max(radius+1, Math.min(width - radius, Math.random() * width));
    const y = Math.max(radius+1, Math.min(height - radius, Math.random() * height));
    // velocity
    const vx = Math.random()*defaultParticleSettings.velocity + ((defaultParticleSettings.velocity / 2) * -1);
    const vy = Math.random()*defaultParticleSettings.velocity + ((defaultParticleSettings.velocity / 2) * -1);
    // color
    const color = this.fillColor();

    return {color, radius, x, y, vx, vy, id: this.guid() }
  }

  private guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  private drawParticle(particle: Particle) {
    debugger;
    const gradient = this.context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius);
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(defaultParticleSettings.particleBlur, particle.color);
    gradient.addColorStop(1, 'black');

    this.context.beginPath();
    this.context.fillStyle = gradient;
    this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2, false);
    this.context.fill();

    this.collisionDetectionCanvasBorders(particle);

    particle.x += particle.vx;
    particle.y += particle.vy;
  }

  private fillColor(): string {
    // random colors
    var r = Math.random()*255>>0;
    var g = Math.random()*255>>0;
    var b = Math.random()*255>>0;
    return `rgba(${r}, ${g}, ${b}, ${defaultParticleSettings.particleOpacity})`;
  }

  private collisionDetectionCanvasBorders(particle: Particle) {
    const width = this.canvasElement.nativeElement.width;
    const height = this.canvasElement.nativeElement.height;

    if(particle.x < particle.radius) particle.vx *= -1;
    if(particle.y < particle.radius) particle.vy *= -1;
    if(particle.x > width - particle.radius) particle.vx *= -1;
    if(particle.y > height - particle.radius) particle.vy *= -1;
  }
}
