import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatsListComponent } from './feats-list.component';

describe('FeatsListComponent', () => {
  let component: FeatsListComponent;
  let fixture: ComponentFixture<FeatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
