import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDetailShellComponent } from './standard-detail-shell.component';

describe('StandardDetailShellComponent', () => {
  let component: StandardDetailShellComponent;
  let fixture: ComponentFixture<StandardDetailShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardDetailShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardDetailShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
