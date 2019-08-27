import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {User} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    public currentUser: User = null;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            this.currentUser = user;
        });
    }

    singleAuthState() {
        return this.afAuth.authState.pipe(first());
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

    ngOnDestroy(): void {
    }

}
