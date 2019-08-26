import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {

    }

    private authChange() {
        return this.afAuth.authState;
    }

    isAuthenticated() {
        return this.authChange().pipe(first()).subscribe(user => {
            return !!user;
        });
    }

    signIn() {
        return this.afAuth.auth.signInAnonymously();
    }

    createAccountWithEmailAndPassword(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.afAuth.auth.signOut().then(value => {
            console.log('Log out successful! ' + value);
        });
    }

}
