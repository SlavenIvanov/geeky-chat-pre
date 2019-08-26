import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ChatRoomsPage} from './page/chat-rooms/chat-rooms.page';
import {AuthPage} from './page/auth/auth.page';
import {ChatPage} from './page/chat/chat.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthPage
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
        redirectTo: 'auth'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
