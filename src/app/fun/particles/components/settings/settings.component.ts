import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as particles from '../../actions/particles.actions';
import { CanvasSettings } from '../../models';

@Component({
  selector: 'evb-settings',
  template: `
  <aside class="settings">
    <h2 class="settings__header">Canvas settings</h2>
    <button (click)="addOne()">+</button>
  </aside>`,
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private store: Store<State>) {}

  ngOnInit() {
    //
  }

  addOne() {
    this.store.dispatch(new particles.Create(1, window.innerWidth, window.innerHeight));
  }
}
