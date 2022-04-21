import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeContainerComponent } from './components/home-container/home-container.component';
import { MainComponent } from './components/home-container/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatListComponent } from './components/home-container/chat-list/chat-list.component';
import { EventsListComponent } from './components/home-container/events-list/events-list.component';
import { FeatsListComponent } from './components/home-container/feats-list/feats-list.component';
import { ClubsListComponent } from './components/home-container/clubs-list/clubs-list.component';
import { GroupsListComponent } from './components/home-container/groups-list/groups-list.component';
const routes: Routes = [
    { path: 'authentication', component: AuthComponent },
    { path: '',   redirectTo: '/authentication', pathMatch: 'full'},
    { 
        path : 'home', 
        component : HomeContainerComponent,
        children : [
            {
                path : '',
                redirectTo: '/home/main',
                pathMatch : 'full'
            },
            {
                path : 'main',
                component : MainComponent,
            },
            {
                path : 'events',
                component : EventsListComponent
            },
            {
                path : 'feats',
                component : FeatsListComponent
            },
            {
                path : 'clubs',
                component : ClubsListComponent
            },
            {
                path : 'groups',
                component : GroupsListComponent
            }
        ]},  
    { path : 'profile/:id', component : ProfileComponent},
];

@NgModule({ 
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] 
})
export class AppRoutingModule {}