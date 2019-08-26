import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    constructor(private navController: NavController) {
    }

    ngOnInit() {
    }

    onSignIn() {

    }

    onNavToSignUp() {
        this.navController.navigateForward('sign-up');
    }

    onForgottenPasswordClicked($event: MouseEvent) {

    }

}
