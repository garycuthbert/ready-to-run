import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseShellComponent } from './exercise-shell.component';

describe('ExerciseShellComponent', () => {
  let component: ExerciseShellComponent;
  let fixture: ComponentFixture<ExerciseShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
