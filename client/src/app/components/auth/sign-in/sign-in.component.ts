import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';
import { User } from '../user_interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  _user: User;
  auth = {};
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
    }, err => console.log(err.error))
  }

}
