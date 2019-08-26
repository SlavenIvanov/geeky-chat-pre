import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatRoomPopoverComponent } from './create-chat-room-popover.component';

describe('CreateChatRoomComponent', () => {
  let component: CreateChatRoomPopoverComponent;
  let fixture: ComponentFixture<CreateChatRoomPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChatRoomPopoverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChatRoomPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
