import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgForOfContext } from '@angular/common';

import { filter } from '../list-filter/filters';

@Component({
  selector: 'evb-list',
  template: `
    <ul>
      <li *ngIf="filterEnabled">
        <evb-list-filter [items]="items" (filter)="onFilter($event)"></evb-list-filter>
      </li>
      <ng-container *ngFor="let item of filteredItems; index as index; odd as odd; even as even; first as first; last as last">
        <li>
          <ng-container *ngTemplateOutlet="itemTemplate; context:
            {$implicit: item, index: index, odd: odd, even: even, first: first, last: last}"></ng-container>
        </li>
      </ng-container>
    </ul>

  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() items: any[];
    // get items(): any[] {
    //   return this.filteredItems;
    // }
    // set items(items: any[]) {
    //   this.filteredItems = items;
    // }

  @Input() filterEnabled = true;

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<NgForOfContext<any>>;

  private filteredItems: any[];

  constructor() { }

  ngOnInit() {
    this.filteredItems = this.items;
  }

  onFilter(filterStr: string) {
    this.filteredItems = this.items.filter(item => filter(item, filterStr));
  }

}
