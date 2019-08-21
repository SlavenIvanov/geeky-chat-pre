import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-create-chat-room',
    templateUrl: './create-chat-room.component.html',
    styleUrls: ['./create-chat-room.component.scss'],
})
export class CreateChatRoomComponent implements OnInit {

    constructor(private fs: AngularFirestore) {
    }

    ngOnInit() {
    }

    onCreateChatRoom(form: NgForm) {
        console.log(this.fs.createId());
        if (form.valid) {
            const chatRoomName = form.value.chatRoomName;

            this.createChatRoom(chatRoomName).then(value => {
                console.log(value);
                form.reset();
            });
        }
    }

    createChatRoom(chatRoomName: string) {
        const chatRooms = this.fs.collection('chat-rooms');

        this.fs.createId();

        return chatRooms.add({id: 'chatRoom.ref.id', name: chatRoomName});
    }
}
