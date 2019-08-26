import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-emoji-popover',
    templateUrl: './emoji-popover.component.html',
    styleUrls: ['./emoji-popover.component.scss'],
})
export class EmojiPopoverComponent {

    emojis = ['🤔', '❤️', '🙈', '😍', '💯', '🔥', '👍', '🇧🇬', '😂', '💎'];

    constructor(private popoverController: PopoverController) {
    }

    onEmojiSelected(emoji: string) {
        console.log('selected: ' + emoji);
        this.popoverController.dismiss({emoji}, null, 'EmojiPopover');
    }
}
