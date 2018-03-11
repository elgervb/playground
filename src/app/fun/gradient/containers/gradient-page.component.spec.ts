import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientPageComponent } from './gradient-page.component';

describe('GradientPageComponent', () => {
  let component: GradientPageComponent;
  let fixture: ComponentFixture<GradientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
