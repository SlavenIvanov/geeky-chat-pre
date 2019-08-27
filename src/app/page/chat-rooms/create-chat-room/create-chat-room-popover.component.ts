import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PopoverController} from '@ionic/angular';
import {FsService} from '../../../service/firestore/fs.service';

@Component({
    selector: 'app-create-chat-room-popover',
    templateUrl: './create-chat-room-popover.component.html',
    styleUrls: ['./create-chat-room-popover.component.scss'],
})
export class CreateChatRoomPopoverComponent implements OnInit {

    constructor(private popoverController: PopoverController,
                private fsService: FsService) {
    }

    ngOnInit() {
    }

    onCreateChatRoom(form: NgForm) {

        if (form.valid) {
            const chatRoomName = form.value.chatRoomName;

            this.fsService.createChatRoom(chatRoomName).then(() => {
                this.popoverController.dismiss(null, null, 'CreateChatRoomPopover');
                form.reset();
            });
        }
    }

    createChatRoom(chatRoomName: string) {
        // const chatRooms = this.fs.collection('chat-rooms');
        //
        // const id = this.fs.createId();
        //
        // return chatRooms.doc(id).set(
        //     {
        //         id,
        //         name: chatRoomName,
        //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     }
        // );
    }
}
