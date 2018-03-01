import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanvasSettings } from '../models';

@Component({
  selector: 'evb-settings',
  template: `
  <aside class="settings">
    <h2 class="settings__header">Canvas settings</h2>
    <form [formGroup]="canvasForm" novalidate>
      <label>Number of particles ({{canvasForm.get('number').value}})</label>
      <input formControlName="number" type="range" min="1" max="250">
    </form>
  </aside>`,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() canvasSettings: CanvasSettings;
  // @Output() updateCanvasSettings = new EventEmitter<CanvasSettings>();

  canvasForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();

    // this.canvasForm.valueChanges
    // .forEach(() => {
    //   debugger;
    // });
  }

  private createForm() {
    this.canvasForm = this.fb.group({
      number: ['', Validators.required]
    });

    this.canvasForm.patchValue(this.canvasSettings);
  }

}
