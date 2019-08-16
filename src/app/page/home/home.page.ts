import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    items: Observable<any[]>;
    message = '🤔';

    constructor(public fs: AngularFirestore) {
        this.items = fs.collection('chat', ref =>
            ref.orderBy('timestamp', 'asc')).valueChanges().pipe(
            map(value => {
                console.log(value);
                return value;
            })
        );
    }

    stringify(item: any) {
        return JSON.stringify(item);
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
