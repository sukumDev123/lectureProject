import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  auth = { username : '' , password : ''};
  getError: String;
  errSHow: boolean = false;
  constructor(private user: UserSeriveService, private router: Router) {
  }

  ngOnInit() {
    if (this.user.auth()) {
      this.router.navigate(['/home'])
    } else {
      console.log("you are't login ")
    }
  }
  onLogin() {
    this.user.serviceSignIn(this.auth).subscribe(data => {
      this.user.setUserLogin(data);
      this.router.navigate(['/home'])
    }, err => {
      this.errSHow = true;
      this.getError = err.error.message;
    })
  }

}
