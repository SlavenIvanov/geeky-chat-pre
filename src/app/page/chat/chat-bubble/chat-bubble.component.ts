import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../chat-message';
import {AuthService} from '../../../service/auth/auth.service';
import {User} from 'firebase';

@Component({
    selector: 'app-chat-bubble',
    templateUrl: './chat-bubble.component.html',
    styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit {

    @Input() chatMessage: ChatMessage;

    currentUser: User;

    isMine = false;
    isFirst = true;
    isLast = true;

    constructor(private authService: AuthService) {
        this.currentUser = this.authService.currentUser;
    }

    ngOnInit() {
        this.isMine = this.currentUser.uid === this.chatMessage.createdBy.uid;
        this.isFirst = this.chatMessage.isFirst;
        this.isLast = this.chatMessage.isLast;
    }

    setBubbleBorderStyle() {
        const outer = '20px';
        const inner = '5px';
        const end = '20px';

        let style = {};

        if (this.isMine) {
            style = {
                'border-top-left-radius': end,
                'border-top-right-radius': this.isFirst ? outer : inner,
                'border-bottom-right-radius': this.isLast ? outer : inner,
                'border-bottom-left-radius': end
            };
        } else {
            style = {
                'border-top-left-radius': this.isFirst ? outer : inner,
                'border-top-right-radius': end,
                'border-bottom-right-radius': end,
                'border-bottom-left-radius': this.isLast ? outer : inner
            };
        }

        return style;
    }

    setGridPaddingStyle() {
        const outer = '4px';
        const inner = '2px';

        return {
            'padding-top': this.isFirst ? outer : inner,
            'padding-bottom': this.isLast ? outer : inner
        };
    }
}
