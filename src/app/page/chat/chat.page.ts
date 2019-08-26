import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController, PopoverController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {ChatRoom} from '../chat-rooms/chat-room';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {EmojiPopoverComponent} from '../../component/emoji-popover/emoji-popover.component';
import * as firebase from 'firebase';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    id: string;
    name: string;
    messages: Observable<any[]>;

    message = '';

    constructor(private route: ActivatedRoute,
                private navController: NavController,
                private fs: AngularFirestore,
                private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (paramMap.has('chatId')) {
                console.log(paramMap);
                const chatId = paramMap.get('chatId');
                this.getChatData(chatId);
            }
        });
    }

    getChatData(chatId: string) {
        this.fs.doc('chat-rooms/' + chatId).valueChanges()
            .pipe(map(v => v as ChatRoom))
            .subscribe(chatData => {
                this.id = chatData.id;
                this.name = chatData.name;

                this.getChatMessages(this.id);
            });
    }

    getChatMessages(chatId: string) {
        this.messages = this.fs.collection('chat-rooms/' + chatId + '/messages', ref =>
            ref.orderBy('timestamp', 'asc')).valueChanges();
    }

    onMessageSend() {
        console.log(this.message);

        this.fs.collection('chat-rooms/' + this.id + '/messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: this.message
        }).then(() => {
            this.message = '';
        });
    }

    onEmojiPopoverOpen($event: MouseEvent) {
        this.popoverController.create({
            id: 'EmojiPopover',
            component: EmojiPopoverComponent,
            event: $event,
            mode: 'ios'
        }).then(popover => {
            popover.present().then(() => console.log('Popover presented!'));
            popover.onWillDismiss().then(popoverData => {
                if (popoverData.data) {
                    const emoji = popoverData.data.emoji;
                    this.message += emoji;
                } else {
                    console.log('Popover closed without data!');
                }
            });
        });
    }

}
