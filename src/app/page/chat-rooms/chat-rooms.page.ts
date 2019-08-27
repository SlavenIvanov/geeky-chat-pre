import {Component, OnInit} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import {CreateChatRoomPopoverComponent} from './create-chat-room/create-chat-room-popover.component';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../service/auth/auth.service';
import {FsService} from '../../service/firestore/fs.service';

@Component({
    selector: 'app-chat-rooms',
    templateUrl: './chat-rooms.page.html',
    styleUrls: ['./chat-rooms.page.scss'],
})
export class ChatRoomsPage implements OnInit {

    chatRooms: Observable<any[]>;

    constructor(private popoverController: PopoverController,
                private fs: AngularFirestore,
                private navController: NavController,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.chatRooms = this.fs.collection('chat-rooms', ref =>
            ref.orderBy('timestamp', 'desc')).valueChanges();
    }

    onCreateChatRoom($event: MouseEvent) {
        this.popoverController.create({
            id: 'CreateChatRoomPopover',
            component: CreateChatRoomPopoverComponent,
            event: $event,
            mode: 'ios'
        }).then(popover => {
            popover.present().then(() => console.log('Create Chat Room Popover presented!'));
        });
    }

    onChatRoomClicked(chatRoom: any) {
        const chatRoomId = chatRoom.id;
        console.log(chatRoom);
        this.navController.navigateForward(['chat', chatRoomId]);
    }

    onSignOut() {
        this.authService.signOut().then(() => this.navController.navigateRoot('sign-in'));
    }

}
