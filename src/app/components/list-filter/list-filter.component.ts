import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'evb-list-filter',
  template: `<input type="text" (input)="onFilter($event.currentTarget.value)">`,
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {

  @Input() items: any[];
  @Output() filter = new EventEmitter<string>();

  private filterSubject = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.filterSubject
      .pipe(distinctUntilChanged(), debounceTime<string>(200))
      .subscribe(filter => this.filter.emit(filter));
  }

  onFilter(filter: string) {
    this.filterSubject.next(filter);
  }
}
