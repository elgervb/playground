import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutsModule } from '../../../layouts/layouts.module';
import { ParticlesPageComponent } from './particles.page';
import { SettingsComponent } from '../components/settings/settings.component'
import { CanvasComponent } from '../components/canvas/canvas.component';

describe('ParticlesComponent', () => {
  let component: ParticlesPageComponent;
  let fixture: ComponentFixture<ParticlesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesPageComponent, SettingsComponent, CanvasComponent ],
      imports: [LayoutsModule]
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
