import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {CreateChatRoomComponent} from './create-chat-room/create-chat-room.component';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-chat-rooms',
    templateUrl: './chat-rooms.page.html',
    styleUrls: ['./chat-rooms.page.scss'],
})
export class ChatRoomsPage implements OnInit {

    chatRooms: Observable<any[]>;

    constructor(private popoverController: PopoverController,
                private fs: AngularFirestore) {
    }

    ngOnInit() {
        this.chatRooms = this.fs.collection('chat-rooms').valueChanges();
    }

    onCreateChatRoom($event: MouseEvent) {
        this.popoverController.create({
            id: 'CreateChatRoomPopover',
            component: CreateChatRoomComponent,
            event: $event,
            mode: 'ios'
        }).then(popover => {
            popover.present().then(() => console.log('Create Chat Room Popover presented!'));
        });
    }

    onChatRoomClicked(chatRoom: any) {
        console.log(chatRoom);
    }
}
