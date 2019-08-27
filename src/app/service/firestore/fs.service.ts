import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';
import {first, map} from 'rxjs/operators';
import {ChatRoom} from '../../page/chat-rooms/chat-room';
import {ChatMessage} from 'src/app/page/chat/chat-message';

@Injectable({
    providedIn: 'root'
})
export class FsService {

    private chatRoomsId = 'chat-rooms';

    private messagesId = 'messages';

    constructor(private authService: AuthService,
                private fs: AngularFirestore) {
    }

    createChatRoom(roomName: string) {
        const roomId = this.getUid();

        return this.fs.collection(this.chatRoomsId).doc(roomId).set({
            id: roomId,
            name: roomName,
            createdBy: {
                uid: this.authService.currentUser.uid,
                email: this.authService.currentUser.email
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    chatRoom(roomId: string) {
        return this.fs.collection(this.chatRoomsId).doc(roomId)
            .valueChanges()
            .pipe(
                first(),
                map(v => v as ChatRoom)
            );
    }

    chatRooms() {
        return this.fs.collection(this.chatRoomsId, ref => ref.orderBy('timestamp', 'desc'))
            .valueChanges()
            .pipe(map(v => v as ChatRoom[]));
    }

    sendMessage(chatRoomId: string, message: string) {
        const messageId = this.getUid();

        return this.fs.collection(this.chatRoomsId)
            .doc(chatRoomId)
            .collection(this.messagesId)
            .doc(messageId).set({
                id: messageId,
                message,
                createdBy: {
                    uid: this.authService.currentUser.uid,
                    email: this.authService.currentUser.email
                },
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    messages(chatId: string) {
        return this.fs.collection(this.chatRoomsId).doc(chatId).collection(this.messagesId, ref =>
            ref.orderBy('timestamp', 'asc')).valueChanges().pipe(map(v => v as ChatMessage[]));
    }

    private getUid() {
        return this.fs.createId();
    }

}
