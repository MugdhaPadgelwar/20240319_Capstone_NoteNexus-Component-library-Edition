import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  token!: string;

  /**
   * Constructor for ResetComponent.
   * @param formBuilder FormBuilder instance for building form controls.
   * @param router Router instance for navigating between routes.
   * @param activatedRoute ActivatedRoute instance for accessing route parameters.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    // Initialize reset password form
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator()],
      ],
    });

    // Fetch the token from ActivatedRoute
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  /**
   * Handles form submission.
   * If the form is valid, navigates to the login page.
   * Otherwise, marks all form fields as touched for validation.
   */
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('password')?.value;
      const confirmPassword =
        this.resetPasswordForm.get('confirmPassword')?.value;
      const password = {
        newPassword: newPassword,
      };

      this.httpClient
        .put(
          `http://localhost:3000/users/resetpassword?token=${this.token}`,
          password
        )
        .subscribe(
          (response) => {
            this.router.navigate(['/signin']);
          },
          (error) => {
            console.error('Error resetting password:', error);
          }
        );
    } else {
      this.validateAllFormFields(this.resetPasswordForm);
    }
  }

  /**
   * Recursively marks all form fields as touched.
   * @param formGroup FormGroup instance to validate.
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }

  /**
   * Custom validator function for confirming password.
   * @returns Validator function for confirming password.
   */
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('password');
      const confirmPassword = control.value;
      return password && confirmPassword && password.value !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    };
  }
}
