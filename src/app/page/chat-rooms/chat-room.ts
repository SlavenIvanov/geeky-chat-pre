import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export class ChatRoom {

    constructor(public id: string,
                public name: string,
                public timestamp: FieldValue) {
    }

}
