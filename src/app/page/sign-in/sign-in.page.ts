import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../service/auth/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    constructor(private navController: NavController,
                private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            console.log('User is authenticated, with a verified email!');
        }
    }

    onSignIn() {

    }

    onNavToSignUp() {
        this.navController.navigateForward('sign-up');
    }

    onForgottenPasswordClicked($event: MouseEvent) {

    }

    onSignOut() {
        this.authService.signOut().then(value => {
            console.log('Signed out!');
            console.log(value);
        });
    }

}
