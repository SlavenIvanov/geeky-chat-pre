import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {ChatBubbleComponent} from '../../component/chat-bubble/chat-bubble.component';
import {EmojiPopoverComponent} from '../../component/emoji-popover/emoji-popover.component';
import {HomePage} from './home.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage, ChatBubbleComponent, EmojiPopoverComponent],
    entryComponents: [EmojiPopoverComponent]
})
export class HomePageModule {
}
