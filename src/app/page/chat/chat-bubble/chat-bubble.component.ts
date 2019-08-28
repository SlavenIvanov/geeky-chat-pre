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

}
