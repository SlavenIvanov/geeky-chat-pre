import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    constructor(private navController: NavController,
                private authService: AuthService,
                private toastController: ToastController) {
    }

    ngOnInit() {
    }

    onNavToSignIn() {
        this.navController.navigateBack('sign-in');
    }

    onCreateAccountPressed(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            console.log(`${email} : ${password}`);
            this.createAccount(email, password);
        }
    }

    createAccount(email: string, password: string) {
        this.authService.createAccountWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log(userCredential);
                this.onAccountCreated(userCredential);
            })
            .catch(error => {
                this.presentErrorToast(error);
            });
    }

    presentErrorToast(error: Error) {
        this.toastController.create({
            message: error.message,
            duration: 2000
        }).then(toast => toast.present());
    }

    onAccountCreated(userCredential: UserCredential) {
        this.navController.navigateForward('sign-in').then(() => {
            const email = userCredential.user.email;
            this.toastController.create({
                message: 'Имейл за потвърждаване на акаунта е изпратен на : ' + email,
                duration: 5000
            }).then(toast => toast.present());
        });
    }

}
