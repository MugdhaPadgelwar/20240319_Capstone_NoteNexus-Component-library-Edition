import { HttpClient } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @HostBinding('style.overflow') overflow = 'hidden';

  signupForm: FormGroup;

  /**
   * Constructor
   *
   * Initializes the signup form with validators for username, email, and password fields.
   * @param formBuilder FormBuilder instance for creating the form group
   */
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
          (control: { value: any }) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&()])(?=.*[0-9])(?!.*\s)(?!.*(\d)\1)/;
            return passwordRegex.test(control.value)
              ? null
              : { invalidPassword: true };
          },
        ],
      ],
    });
  }

  /**
   * onSubmit
   *
   * Handles form submission.
   * Logs success message if the form is valid, otherwise logs error message.
   */
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted successfully!');
      console.log(this.signupForm.value);
      const userData = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: 'user',
      };
      this.http
        .post('http://localhost:3000/users/register', userData)
        .subscribe({
          next: (response) => {
            this.show();
            setTimeout(() => {
              this.navigateShowPost();
            }, 2000);
          },
          error: (error) => {
            alert('Signup failed');
            console.error('Signup failed', error);
          },
        });
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  show() {
    this.messageService.add({
      severity: 'custom',
      summary: 'Success',
      detail: 'User registered Succesfully',
    });
  }
  navigateShowPost() {
    this.router.navigate(['/signin']);
  }

  /**
   * showAlert
   *
   * Displays an alert if the form is invalid.
   */
  showAlert() {
    if (this.signupForm.invalid) {
      alert('Please fill all the fields correctly.');
    }
  }
}
