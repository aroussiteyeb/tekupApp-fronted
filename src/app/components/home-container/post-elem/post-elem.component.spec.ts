import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostElemComponent } from './post-elem.component';

describe('PostElemComponent', () => {
  let component: PostElemComponent;
  let fixture: ComponentFixture<PostElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
