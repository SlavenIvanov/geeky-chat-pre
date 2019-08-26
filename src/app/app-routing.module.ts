import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ChatRoomsPage} from './page/chat-rooms/chat-rooms.page';
import {ChatPage} from './page/chat/chat.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        loadChildren: './page/sign-in/sign-in.module#SignInPageModule'
    },

    {
        path: 'sign-up',
        loadChildren: './page/sign-up/sign-up.module#SignUpPageModule'
    },
    {
        path: 'chat-rooms',
        component: ChatRoomsPage,
        canActivate: [AuthGuard]
    },
    {
        path: 'chat/:chatId',
        component: ChatPage,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'sign-in'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
