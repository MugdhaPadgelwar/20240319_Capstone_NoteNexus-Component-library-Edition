import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signinForm: FormGroup; // Form group for sign-in form

  /**
   * Constructor to initialize form builder and create the sign-in form.
   * @param formBuilder FormBuilder service for building reactive forms
   */
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    // Initialize the sign-in form with form controls and validators
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: ['', Validators.required], // Password field with required validator
      rememberMe: [false], // Checkbox for "Remember Me" option, initially unchecked
    });
  }

  /**
   * Method to handle form submission.
   * Logs form data if the form is valid.
   */
  onSubmit() {
    if (this.signinForm.valid) {
      // Log form data if the form is valid
      console.log('Form submitted successfully!');
      console.log('Email:', this.signinForm.value.email);
      console.log('Password:', this.signinForm.value.password);
      console.log('Remember Me:', this.signinForm.value.rememberMe);
      const loginData = {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password,
      };
      this.http.post('http://localhost:3000/users/login', loginData).subscribe({
        next: (response: any) => {
          this.show();

          const token = response.token;
          const role = response.role;
          const userID = response.userId;
          console.log(userID);

          setTimeout(() => {
            if (token && role && userID) {
              console.log(token);
              localStorage.setItem('userToken', token);
              localStorage.setItem('role', role);
              localStorage.setItem('userID', userID);
              this.authService.logIn();
              // Navigate to the home page if the token is present
              if (role === 'user') {
                this.router.navigate(['/userdashboard']);
              } else {
                this.router.navigate(['/admindashboard']);
              }
            } else {
              // Optionally handle the case where there's no token in the response
              console.log('No token received');
            }
          }, 2000);
        },
        error: (error) => {
          alert('Enter correct email or password');
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
      detail: 'User Signed in Successfully',
    });
  }
}
