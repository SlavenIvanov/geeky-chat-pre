import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../service/auth/auth.service';
import {ToastService} from '../../service/toast/toast.service';
import {NgForm} from '@angular/forms';
import {User} from 'firebase';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    constructor(private navController: NavController,
                private authService: AuthService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.authService.singleAuthState().subscribe(user => this.authenticateUser(user));
    }

    onSignIn(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            this.authService.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    this.authenticateUser(userCredential.user);
                })
                .catch(error => this.toastService.show(error.message, 3000, 'warning'));
        }
    }

    onNavToSignUp() {
        this.navController.navigateForward('sign-up');
    }

    onForgottenPasswordClicked($event: MouseEvent) {

    }

    authenticateUser(user: User) {
        if (user) {
            if (user.emailVerified) {
                this.onUserAuthenticated();
            } else {
                this.showEmailNotVerifiedToast(user.email);
            }
        } else {
            console.log('User not logged in');
        }
    }

    onUserAuthenticated() {
        this.navController.navigateForward('chat-rooms');
    }

    showEmailNotVerifiedToast(email: string) {
        this.toastService.show('Имейл за потвърждаване на акаунта е изпратен на : ' + email, 5000);
    }

}
