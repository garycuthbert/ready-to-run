import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCardsComponent } from './exercise-cards.component';

describe('ExerciseCardsComponent', () => {
  let component: ExerciseCardsComponent;
  let fixture: ComponentFixture<ExerciseCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
