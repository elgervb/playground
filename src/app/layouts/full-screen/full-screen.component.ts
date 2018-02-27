import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evb-full-screen',
  template: '<ng-content></ng-content>',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
