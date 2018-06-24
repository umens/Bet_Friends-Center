import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { AuthenticationService, Logger } from '../../core';

const log = new Logger('Create Account');

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  error: Error = null;
  createAccountForm: FormGroup;
  isLoading: boolean = false;
  mailSend: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  create(): void {
    this.isLoading = true;
    this.authenticationService.createAccount(this.createAccountForm.value)
      .pipe(finalize(() => {
        this.createAccountForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(() => {
        log.debug(`Account successfully created`);
        this.mailSend = true;
        setTimeout(() => {
          this.router.navigate(['/login'], { replaceUrl: true });
        }, 10000);
      }, error => {
        log.debug(`Account creation error: ${error}`);
        this.error = error.error;
      });
  }

  private createForm(): void {
    this.createAccountForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      agreeCGU: true
    });
  }

}
