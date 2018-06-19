import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// import { AuthenticationService, Logger, NotificationService } from '../../core';
import { NotificationType, Notification } from '../../models';
import { Logger } from '../logger.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { NotificationService } from '../notification.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private head: HTMLElement;
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
  ) {
    this.createForm();
    this.head = document.getElementsByTagName('head')[0];
  }

  ngOnInit(): void {
    const link = document.createElement('link');
    link.id = 'loginPage';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'assets/loginpage.css';
    this.head.appendChild(link);
  }

  ngOnDestroy(): void {
    const link = document.getElementById('loginPage');
    this.head.removeChild(link);
  }

  login(): void {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        const notification: Notification = new Notification({
          title: 'Logged In',
          content: 'Hey ' + credentials.username,
          type: NotificationType.SUCCESS
        });
        this.notificationService.showNotification(notification);
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/home';
        // Redirect the user
        this.router.navigate([redirect]);
        // this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
