import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { ShowPostComponent } from './show-post/show-post.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { AdminShowAllComponent } from './admin-show-all/admin-show-all.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    SignupComponent,
    SigninComponent,
    CreatePageComponent,
    ShowPostComponent,
    DetailPageComponent,
    AdminReviewComponent,
    AdminShowAllComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
