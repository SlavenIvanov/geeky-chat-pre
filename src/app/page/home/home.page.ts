import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {AuthService} from '../../service/auth/auth.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: Observable<any[]>;
    message = '🤔';

    constructor(private fs: AngularFirestore,
                private authService: AuthService,
                private navController: NavController) {
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
}
