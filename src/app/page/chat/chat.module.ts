import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ChatPage} from './chat.page';
import {EmojiPopoverComponent} from '../../component/emoji-popover/emoji-popover.component';
import {ChatBubbleComponent} from './chat-bubble/chat-bubble.component';

const routes: Routes = [
    {
        path: '',
        component: ChatPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ChatPage, EmojiPopoverComponent, ChatBubbleComponent],
    entryComponents: [EmojiPopoverComponent, ChatBubbleComponent]
})
export class ChatPageModule {
}
