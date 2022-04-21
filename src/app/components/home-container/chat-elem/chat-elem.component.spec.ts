import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatElemComponent } from './chat-elem.component';

describe('ChatElemComponent', () => {
  let component: ChatElemComponent;
  let fixture: ComponentFixture<ChatElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatElemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
