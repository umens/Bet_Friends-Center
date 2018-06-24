import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BetCenterModule } from './bet-center/bet-center.module';
import { UserModule } from './user/user.module';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    BetCenterModule,
    UserModule,
    AppRoutingModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
