import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactionRowComponent } from './post-reaction-row.component';

describe('PostReactionRowComponent', () => {
  let component: PostReactionRowComponent;
  let fixture: ComponentFixture<PostReactionRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReactionRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReactionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
