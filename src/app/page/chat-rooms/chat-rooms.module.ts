import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChatRoomsPage} from './chat-rooms.page';
import {CreateChatRoomComponent} from './create-chat-room/create-chat-room.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [ChatRoomsPage, CreateChatRoomComponent],
    entryComponents: [CreateChatRoomComponent]
})
export class ChatRoomsPageModule {
}
