import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { SimpleNotificationsModule, SimpleNotificationsComponent } from 'angular2-notifications';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { NotificationService } from './notification.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './shell/footer/footer.component';
import { TokenInterceptor } from './http/token.interceptor';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
    NotFoundComponent,
    FooterComponent,
    LoginComponent,
  ],
  exports: [
    SimpleNotificationsComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    HttpCacheService,
    ApiPrefixInterceptor,
    ErrorHandlerInterceptor,
    CacheInterceptor,
    {
      provide: HttpClient,
      useClass: HttpService
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificationService,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
