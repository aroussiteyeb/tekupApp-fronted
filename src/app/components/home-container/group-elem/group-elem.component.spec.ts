import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupElemComponent } from './group-elem.component';

describe('GroupElemComponent', () => {
  let component: GroupElemComponent;
  let fixture: ComponentFixture<GroupElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
