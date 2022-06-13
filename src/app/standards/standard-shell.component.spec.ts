import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardShellComponent } from './standard-shell.component';

describe('StandardShellComponent', () => {
  let component: StandardShellComponent;
  let fixture: ComponentFixture<StandardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
