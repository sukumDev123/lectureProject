import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home/home.component";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AuthGuard } from "./auth/auth.guard";
import { LectureAllComponent } from "./components/lecture/lecture-all/lecture-all.component";
import { LectureComponent } from "./components/lecture/lecture/lecture.component";
import { LectureAddComponent } from "./components/lecture/lecture-add/lecture-add.component";


export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'auth', children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },

    ]
  },
  {
    path: 'user', canActivate : [AuthGuard] , children: [
      {
        path: 'lecture', component: LectureComponent, children: [
          { path: 'all', component: LectureAllComponent },
          { path: 'add', component: LectureAddComponent }

        ]
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }


]
