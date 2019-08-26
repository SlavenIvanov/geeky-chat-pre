import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    constructor(private authService: AuthService,
                private navController: NavController) {

    }

    ngOnInit() {
        // if (this.authService.isAuthenticated()) {
        //     this.navController.navigateForward('home');
        // }
    }

    onLogin() {
        // this.authService.signIn().then(value => {
        //     console.log('Login');
        //     console.log(value);
        //     this.navController.navigateForward('home');
        // });
    }

}
