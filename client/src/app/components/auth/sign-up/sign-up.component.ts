import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';
import { User } from '../user_interface'
import { empty } from 'rxjs/Observer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  auth = {};
  firstname: String = '';
  lastname: String = '';
  getError: String;
  errSHow: boolean = false;
  constructor(private user: UserSeriveService, private router: Router) { }

  ngOnInit() {
    if (this.user.auth()) {
      this.router.navigate(['/home'])
    } else {
      console.log("you are't login ")
    }
  }
  onSignUp() {

    /*this.user.serviceSignUp(this.auth).subscribe(data => localStorage.setItem("id_token", data), err => {
      this.errSHow = true;
      this.getError = err.error.message;
    })*/
    console.log()


  }
  onCloseError() {
    this.errSHow = false
  }
}
