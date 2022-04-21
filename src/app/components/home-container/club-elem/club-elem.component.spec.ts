import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubElemComponent } from './club-elem.component';

describe('ClubElemComponent', () => {
  let component: ClubElemComponent;
  let fixture: ComponentFixture<ClubElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
