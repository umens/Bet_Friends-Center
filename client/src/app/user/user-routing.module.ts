import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { Route } from '../core';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'create-account', component: CreateAccountComponent, data: { title: 'Create Account' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
  Route.withShell([
    { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
