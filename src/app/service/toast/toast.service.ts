import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {
    }

    showEmailNotVerified(email: string) {
        this.show(email, 5000);
    }

    show(message: string, duration: number, color?: string) {
        this.toastController.create({message, duration, color}).then(toast => toast.present());
    }

}
