import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Particle, defaultCanvasSettings, defaultParticleSettings } from '../particles.models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

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
  private particles = new Set<Particle>();

  constructor() {}

  ngOnInit() {
    this.context = (this.canvasElement.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasElement.nativeElement.height = window.innerHeight;
    this.canvasElement.nativeElement.width = window.innerWidth;

    for(var i = 0; i < this.canvasSettings.number; i++) {
      this.add(this.createParticle());
    }

    Observable.interval(33).subscribe(this.draw.bind(this));
  }

  add(particle: Particle) {
    this.particles.add(particle);
  }

  draw() {
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "rgba(52, 55, 60, "+ this.canvasSettings.trail+")";
    this.context.fillRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    this.context.globalCompositeOperation = "lighter";

    this.particles.forEach(this.drawParticle.bind(this));
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

    return {color, radius, x, y, vx, vy }
  }

  private drawParticle(particle: Particle) {
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
