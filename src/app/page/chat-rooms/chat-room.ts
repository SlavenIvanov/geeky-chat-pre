import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase';

export class ChatRoom {

    constructor(public id: string,
                public name: string,
                public createdBy: {
                    uid: string,
                    email: string
                },
                public timestamp: FieldValue) {
    }

}
