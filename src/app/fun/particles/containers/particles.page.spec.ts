import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticlesPageComponent } from './particles.page';

describe('ParticlesComponent', () => {
  let component: ParticlesPageComponent;
  let fixture: ComponentFixture<ParticlesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
