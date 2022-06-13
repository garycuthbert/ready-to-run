import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSummaryListComponent } from './standard-summary-list.component';

describe('StandardSummaryListComponent', () => {
  let component: StandardSummaryListComponent;
  let fixture: ComponentFixture<StandardSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardSummaryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
