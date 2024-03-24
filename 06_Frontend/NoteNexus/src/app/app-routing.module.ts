import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminShowAllComponent } from './admin-show-all/admin-show-all.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'pages',
    component: SignupComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'detailpage',
    component: DetailPageComponent,
  },
  {
    path: 'admin-pub-pages',
    component: AdminShowAllComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
