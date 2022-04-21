import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventElemComponent } from './event-elem.component';

describe('EventElemComponent', () => {
  let component: EventElemComponent;
  let fixture: ComponentFixture<EventElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
