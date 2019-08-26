import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {ChatRoom} from '../chat-rooms/chat-room';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    id: string;
    name: string;
    messages: Observable<any[]>;

    constructor(private route: ActivatedRoute,
                private navController: NavController,
                private fs: AngularFirestore) {
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
        this.messages = this.fs.collection('chat-rooms/' + chatId + '/messages').valueChanges();
    }

}
