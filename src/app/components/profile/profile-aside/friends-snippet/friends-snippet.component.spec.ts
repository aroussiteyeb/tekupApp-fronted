import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsSnippetComponent } from './friends-snippet.component';

describe('FriendsSnippetComponent', () => {
  let component: FriendsSnippetComponent;
  let fixture: ComponentFixture<FriendsSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
