import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyRatingComponent } from './ready-rating.component';

describe('ReadyRatingComponent', () => {
  let component: ReadyRatingComponent;
  let fixture: ComponentFixture<ReadyRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
