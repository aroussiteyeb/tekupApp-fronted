import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySnippetComponent } from './gallery-snippet.component';

describe('GallerySnippetComponent', () => {
  let component: GallerySnippetComponent;
  let fixture: ComponentFixture<GallerySnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
