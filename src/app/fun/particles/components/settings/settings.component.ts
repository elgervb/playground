import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as particles from '../../actions/particles.actions';
import { CanvasSettings, Particle } from '../../models';

@Component({
  selector: 'evb-settings',
  template: `
  <aside class="settings">
    <h2 class="settings__header">Canvas settings</h2>
    <button (click)="delete()">-</button>
    <button (click)="add()">+</button>
  </aside>`,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Output() onAdd = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<void>();

  constructor(private store: Store<State>) {}

  ngOnInit() {
    //
  }

  add() {
    this.onAdd.emit(1);
  }

  delete(particle: Particle) {
    this.onDelete.emit();
  }
}
