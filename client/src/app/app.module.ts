import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserSeriveService } from './services/user-service/user-serive.service';
import { HomeComponent } from './components/home/home/home.component'
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { appRoutes } from './route';
import { AuthInterceprot } from './static/auth-interceprot';
import { AuthGuard } from './auth/auth.guard';
import { LectureAllComponent } from './components/lecture/lecture-all/lecture-all.component';
import { LectureAddComponent } from './components/lecture/lecture-add/lecture-add.component';
import { LectureComponent } from './components/lecture/lecture/lecture.component';
import { LectureService } from './services/lecture/lecture.service';
import { CoreComponent } from './components/core/core/core.component';
import { UserSettingComponent } from './components/setting/user-setting/user-setting.component';
import { ServerErrComponent } from './components/errors/server-err/server-err.component';
import { NotfoundPageComponent } from './components/errors/notfound-page/notfound-page.component';
import { ErrorsPageService } from './services/errors-page/errors-page.service';






@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    LectureAllComponent,
    LectureAddComponent,
    LectureComponent,
    CoreComponent,
    UserSettingComponent,
    ServerErrComponent,
    NotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserSeriveService,
    AuthGuard,
    LectureService,
    ErrorsPageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceprot,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
