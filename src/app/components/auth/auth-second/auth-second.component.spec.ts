import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSecondComponent } from './auth-second.component';

describe('AuthSecondComponent', () => {
  let component: AuthSecondComponent;
  let fixture: ComponentFixture<AuthSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
