import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home/home.component";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { AuthGuard } from "./auth/auth.guard";


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'auth/signin', component: SignInComponent },
    { path: 'auth/signup', component: SignUpComponent },
    { path: '', redirectTo: '/home' , pathMatch :'full' },
    { path: '**', redirectTo: '/home' , pathMatch : 'full' }
    
  
  ]
  