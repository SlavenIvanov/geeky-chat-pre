import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-create-chat-room-popover',
    templateUrl: './create-chat-room-popover.component.html',
    styleUrls: ['./create-chat-room-popover.component.scss'],
})
export class CreateChatRoomPopoverComponent implements OnInit {

    constructor(private fs: AngularFirestore,
                private popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    onCreateChatRoom(form: NgForm) {
        console.log(this.fs.createId());
        if (form.valid) {
            const chatRoomName = form.value.chatRoomName;

            this.createChatRoom(chatRoomName).then(() => {
                this.popoverController.dismiss(null, null, 'CreateChatRoomPopover');
                form.reset();
            });
        }
    }

    createChatRoom(chatRoomName: string) {
        const chatRooms = this.fs.collection('chat-rooms');

        const id = this.fs.createId();

        return chatRooms.doc(id).set(
            {
                id,
                name: chatRoomName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
        );
    }
}
