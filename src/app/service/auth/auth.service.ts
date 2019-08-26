import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) {

    }

    authChange() {
        return this.afAuth.authState;
    }

    isAuthenticated() {
        return this.authChange().pipe(first()).subscribe(user => {
            console.log('Authenticating: ');
            console.log(user);
            debugger;
            if (user) {
                return user.emailVerified;
            }
            return false;
        });
    }


    createAccountWithEmailAndPassword(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.afAuth.auth.signOut();
    }

}
