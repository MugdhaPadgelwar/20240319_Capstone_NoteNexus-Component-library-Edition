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
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserShowPostComponent } from './user-show-post/user-show-post.component';
import { EditorComponent } from './editor/editor.component';
import { HighlightServiceService } from './highlight-service.service';

import {
  HighlightModule,
  HIGHLIGHT_OPTIONS,
  HighlightOptions,
} from 'ngx-highlightjs';

import { ToDoComponent } from './to-do/to-do.component';
import { AdminDashbaordComponent } from './admin-dashbaord/admin-dashbaord.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminDeatilPageComponent } from './admin-deatil-page/admin-deatil-page.component';
import { ExploreFeedComponent } from './explore-feed/explore-feed.component';

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
    SidebarComponent,
    UserDashboardComponent,
    UserShowPostComponent,
    EditorComponent,

    ToDoComponent,
     AdminDashbaordComponent,
     AdminSidebarComponent,
     AdminDeatilPageComponent,
     ExploreFeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    HighlightModule,

    MarkdownModule.forRoot(),
  ],
  providers: [
    HighlightServiceService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
