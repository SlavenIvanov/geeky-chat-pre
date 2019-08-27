import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './service/auth/auth.service';
import {NavController} from '@ionic/angular';
import {ToastService} from './service/toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private navCtrl: NavController,
                private toastService: ToastService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.authService.singleAuthState().toPromise().then(user => {
            if (user) {
                if (user.emailVerified) {
                    return true;
                }
                this.toastService.showEmailNotVerified(user.email);
            }
            console.log('User not logged in');
            this.navCtrl.navigateRoot('sign-in');
        });

    }

}
