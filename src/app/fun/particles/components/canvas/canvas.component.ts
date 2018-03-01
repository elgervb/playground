import { Component, OnInit, Input, ViewChild, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Particle, defaultCanvasSettings, defaultParticleSettings } from '../../models';

@Component({
  selector: 'evb-canvas',
  template: `<canvas #canvas></canvas>`,
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnChanges {

  @ViewChild('canvas') private canvasElement: ElementRef;
  @Input() particles: Particle[];

  private context: CanvasRenderingContext2D;
  private canvasSettings = defaultCanvasSettings;

  constructor() { }

  ngOnInit() {
    this.context = (this.canvasElement.nativeElement as HTMLCanvasElement).getContext('2d');
    this.canvasElement.nativeElement.height = window.innerHeight;
    this.canvasElement.nativeElement.width = window.innerWidth;

    Observable.interval(33).subscribe(this.draw.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['particles']) {
      const particles = changes['particles'].currentValue;
      this.particles = [...particles.map(particle => ({...particle}))];
    }
  }

  draw() {
    this.context.globalCompositeOperation = "source-over";
    this.context.fillStyle = "rgba(52, 55, 60, "+ this.canvasSettings.trail+")";
    this.context.fillRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
    this.context.globalCompositeOperation = "lighter";

    if (this.particles) {
      this.particles.forEach(particle => this.drawParticle(particle));
    }
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

  private collisionDetectionCanvasBorders(particle: Particle) {
    const width = this.canvasElement.nativeElement.width;
    const height = this.canvasElement.nativeElement.height;

    if(particle.x < particle.radius) particle.vx *= -1;
    if(particle.y < particle.radius) particle.vy *= -1;
    if(particle.x > width - particle.radius) particle.vx *= -1;
    if(particle.y > height - particle.radius) particle.vy *= -1;
  }

}
