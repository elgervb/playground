import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'evb-progressbar',
  template: `
    <div class="progressbar"
      [class.progress--with-text]="showText"
      [class.progress--gt-50]="progress >= 50"
      [style.height.px]="height"
      [attr.data-progress]="progress">
      <div class="progressbar__inner" [style.width.%]="progress"></div>
    </div>
  `,
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnChanges {

  @Input() progress = 0;
  @Input() showText = false;
  @Input() height?;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      this.progress = +changes['progress'].currentValue;
    }
  }

}
