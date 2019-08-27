import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class FsService {

    private chatRoomsId = 'chat-rooms';

    private messagesId = 'messages';

    constructor(private authService: AuthService,
                private fs: AngularFirestore) {
    }

    chatRooms() {
//TODO
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

    messages() {
        // todo
    }

    private getUid() {
        return this.fs.createId();
    }

}
