import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetInstructionsSent: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.getEmail()?.value;

      this.http
        .post<any>('http://localhost:3000/users/forget-password', { email })
        .subscribe(
          (response) => {
            console.log('Reset instructions sent successfully');
            this.resetInstructionsSent = true;
          },
          (error) => {
            console.error('Error sending reset instructions:', error);
            if (error.status === 400) {
              this.errorMessage = 'Invalid email format';
            } else if (error.status === 404) {
              this.errorMessage = 'Invalid Email';
            } else {
              this.errorMessage =
                'An unexpected error occurred. Please try again.';
            }
          }
        );
    }
  }

  getEmail(): AbstractControl<any, any> | null {
    return this.forgotPasswordForm.get('email');
  }
}
