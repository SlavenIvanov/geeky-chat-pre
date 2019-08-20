import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ChatRoomsPage} from './page/chat-rooms/chat-rooms.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./page/auth/auth.module').then(m => m.AuthPageModule)
    },
    {
        path: 'chat/:chatId',
        loadChildren: './chat/chat.module#ChatPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'chat-rooms',
        component: ChatRoomsPage,
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
