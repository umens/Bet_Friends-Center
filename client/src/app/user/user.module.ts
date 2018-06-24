import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidateAccountComponent } from './validate-account/validate-account.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    ValidateAccountComponent,
    ProfileComponent,
  ]
})
export class UserModule { }
