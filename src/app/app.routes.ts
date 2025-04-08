import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FollowingComponent } from './pages/following/following.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, 
  { path: 'auth', component: AuthComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'following', component: FollowingComponent }, 
  { path: 'profile/:userId', component: ProfileComponent },
  { path: '**', redirectTo: 'auth' }
];