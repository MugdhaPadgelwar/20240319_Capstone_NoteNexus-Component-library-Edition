import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AdminDashbaordComponent } from './admin-dashbaord/admin-dashbaord.component';
import { AdminDeatilPageComponent } from './admin-deatil-page/admin-deatil-page.component';
import { AdminShowAllComponent } from './admin-show-all/admin-show-all.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { EditorComponent } from './editor/editor.component';
import { ExploreDetailPageComponent } from './explore-detail-page/explore-detail-page.component';
import { ExploreFeedComponent } from './explore-feed/explore-feed.component';
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
import { ViewCommmentComponent } from './view-commment/view-commment.component';
import { AuthGuardService } from './auth-guard.service';
import { TestingComponent } from './testing/testing.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { DisplayExploreFeedComponent } from './display-explore-feed/display-explore-feed.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    canActivate: [AuthGuardService],
    component: AdminShowAllComponent,
  },
  {
    path: 'resetpassword/:token',
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
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'add-comment',
    component: AddCommentComponent,
  },
  {
    path: 'explore-feed',

    component: ExploreFeedComponent,
  },
  {
    path: 'explore-detail-feed',

    component: ExploreDetailPageComponent,
  },
  {
    path: 'view-comment',

    component: ViewCommmentComponent,
  },
  {
    path: 'test',
    component: TestingComponent,
  },

  {
    path: 'sub-nav',
    component: SubNavComponent,
  },
  {
    path: 'explore',
    component: DisplayExploreFeedComponent,
  },
  {
    path: 'admin-review',
    component: AdminReviewComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
