import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {AuthService} from '../../service/auth/auth.service';
import {NavController, PopoverController} from '@ionic/angular';
import {EmojiPopoverComponent} from '../../component/emoji-popover/emoji-popover.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: Observable<any[]>;
    message = '';

    constructor(private fs: AngularFirestore,
                private authService: AuthService,
                private navController: NavController,
                private popoverController: PopoverController) {
        this.items = fs.collection('chat', ref =>
            ref.orderBy('timestamp', 'asc')).valueChanges().pipe(
            map(value => {
                console.log(value);
                return value;
            })
        );
    }

    onLogout() {
        this.authService.signOut().then(() => {
            console.log('Logout');
            this.navController.navigateBack('auth');
        });
    }

    onMessageSend() {
        console.log(this.message);
        firebase.firestore.FieldValue.serverTimestamp();
        this.fs.collection('chat').add({
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
