import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService, Logger } from '../../core';

const log = new Logger('Create Account');

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  error: Error = null;
  forgotPasswordForm: FormGroup;
  isLoading: boolean = false;
  mailSend: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  forgot(): void {
    this.error = null;
    this.isLoading = true;
    this.authenticationService.forgotPassord(this.forgotPasswordForm.value)
      .pipe(finalize(() => {
        this.forgotPasswordForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(() => {
        log.debug(`Email send`);
        this.mailSend = true;
        setTimeout(() => {
          this.router.navigate(['/login'], { replaceUrl: true });
        }, 10000);
      }, error => {
        log.debug(`Password reset error: ${error}`);
        this.error = error.error;
      });
  }

  private createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
