import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFirstComponent } from './auth-first.component';

describe('AuthFirstComponent', () => {
  let component: AuthFirstComponent;
  let fixture: ComponentFixture<AuthFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
