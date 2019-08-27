import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase';

export class ChatMessage {

    constructor(public id: string,
                public message: string,
                public createdBy: {
                    uid: string,
                    email: string
                },
                public timestamp: FieldValue) {
    }

}
