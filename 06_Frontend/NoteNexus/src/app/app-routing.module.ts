import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbaordComponent } from './admin-dashbaord/admin-dashbaord.component';
import { AdminDeatilPageComponent } from './admin-deatil-page/admin-deatil-page.component';
import { AdminShowAllComponent } from './admin-show-all/admin-show-all.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { EditorComponent } from './editor/editor.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MainComponent } from './main/main.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ToDoComponent } from './to-do/to-do.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserShowPostComponent } from './user-show-post/user-show-post.component';

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

  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'showpost',
    component: ShowPostComponent,
  },
  {
    path: 'usershowpost',
    component: UserShowPostComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
  },
  {
    path: 'createpost',
    component: CreatePageComponent,
  },
  {
    path: 'userdashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'todo',
    component: ToDoComponent,
  },
  {
    path: 'admindashboard',
    component: AdminDashbaordComponent,
  },
  {
    path: 'admindetailpage',
    component: AdminDeatilPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
