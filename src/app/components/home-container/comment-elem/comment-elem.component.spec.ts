import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentElemComponent } from './comment-elem.component';

describe('CommentElemComponent', () => {
  let component: CommentElemComponent;
  let fixture: ComponentFixture<CommentElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
