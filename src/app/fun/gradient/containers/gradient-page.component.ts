import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Gradient {
  colorFrom: string;
  colorTo: string;
  rotation: number;
}

@Component({
  selector: 'evb-gradient-page',
  template: `
  <evb-full-screen [style.background]="gradient">
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-group">
        <label> From:
          <input class="form-control" type="color" formControlName="colorFrom" [style.background]="form.get('colorFrom').value">
        </label>
      </div>
      <div class="form-group">
        <label> To:
          <input class="form-control" type="color" formControlName="colorTo" [style.background]="form.get('colorTo').value">
        </label>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">save</button>
      </div>
    </form>
    <div>
      <svg (click)="refresh()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.843 294.843" class="icon-refresh">
        <g>
          <path d="M147.421,0c-3.313,0-6,2.687-6,6s2.687,6,6,6c74.671,0,135.421,60.75,135.421,135.421s-60.75,135.421-135.421,135.421   S12,222.093,12,147.421c0-50.804,28.042-96.902,73.183-120.305c2.942-1.525,4.09-5.146,2.565-8.088   c-1.525-2.942-5.147-4.09-8.088-2.565C30.524,41.937,0,92.118,0,147.421c0,81.289,66.133,147.421,147.421,147.421   s147.421-66.133,147.421-147.421S228.71,0,147.421,0z" class="icon-refresh__line"></path>
          <path d="M205.213,71.476c-16.726-12.747-36.71-19.484-57.792-19.484c-52.62,0-95.43,42.81-95.43,95.43s42.81,95.43,95.43,95.43   c25.49,0,49.455-9.926,67.479-27.951c2.343-2.343,2.343-6.142,0-8.485c-2.343-2.343-6.143-2.343-8.485,0   c-15.758,15.758-36.709,24.436-58.994,24.436c-46.003,0-83.43-37.426-83.43-83.43s37.426-83.43,83.43-83.43   c36.894,0,69.843,24.715,80.126,60.104c0.924,3.182,4.253,5.011,7.436,4.087c3.182-0.925,5.012-4.254,4.087-7.436   C233.422,101.308,221.398,83.809,205.213,71.476z" class="icon-refresh__line"></path>
          <path d="M217.773,129.262c-2.344-2.343-6.143-2.343-8.485,0c-2.343,2.343-2.343,6.142,0,8.485l22.57,22.571   c1.125,1.125,2.651,1.757,4.243,1.757s3.118-0.632,4.243-1.757l22.57-22.571c2.343-2.343,2.343-6.142,0-8.485   c-2.344-2.343-6.143-2.343-8.485,0l-18.328,18.328L217.773,129.262z" class="icon-refresh__line"></path>
        </g>
      </svg>
    </div>
  </evb-full-screen>
  `,
  styleUrls: ['./gradient-page.component.scss']
})
export class GradientPageComponent implements OnInit {

  gradient: string;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm({
      colorFrom: this.randomColor(),
      colorTo: this.randomColor(),
      rotation: 45
    });
  }

  refresh() {
    this.form.patchValue({
      colorFrom: this.randomColor(),
      colorTo: this.randomColor(),
      rotation: 45
    });
    this.submit();
  }

  submit() {
    const value: Gradient = this.form.value;

    this.gradient = this.calculateCssGradient(value);
  }

  private calculateCssGradient(gradient: Gradient) {
    return `linear-gradient(${gradient.rotation}deg, ${gradient.colorFrom}, ${gradient.colorTo})`;
  }

  private createForm(gradient: Gradient) {
    this.form = this.formBuilder.group({
      rotation: ['', [Validators.min(0), Validators.max(255)]],
      colorFrom: ['', [Validators.pattern(/#[a-fA-F0-9]{6}/), Validators.required]],
      colorTo: ['', [Validators.pattern(/#[a-fA-F0-9]{6}/), Validators.required]]
    });

    this.form.patchValue(gradient);
    this.submit();
  }

  private randomColor(): string {
    const r = Math.random() * 255 >> 0;
    const g = Math.random() * 255 >> 0;
    const b = Math.random() * 255 >> 0;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
