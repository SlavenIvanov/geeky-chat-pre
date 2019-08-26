import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChatRoomsPage} from './chat-rooms.page';
import {CreateChatRoomPopoverComponent} from './create-chat-room/create-chat-room-popover.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [ChatRoomsPage, CreateChatRoomPopoverComponent],
    entryComponents: [CreateChatRoomPopoverComponent]
})
export class ChatRoomsPageModule {
}
