import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AuthService} from './service/auth/auth.service';
import {AuthGuard} from './auth.guard';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ChatRoomsPageModule} from './page/chat-rooms/chat-rooms.module';
import {AuthPageModule} from './page/auth/auth.module';
import {ChatPageModule} from './page/chat/chat.module';
import {SignInPageModule} from './page/sign-in/sign-in.module';
import {SignUpPageModule} from './page/sign-up/sign-up.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        SignInPageModule,
        SignUpPageModule,
        AuthPageModule,
        ChatRoomsPageModule,
        ChatPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        AuthGuard,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
