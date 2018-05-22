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
  auth = { firstname : '' , lastname : '', username : '', password : '' , password2 : '' };

  getError: String;
  errSHow: boolean = false;
  constructor(private user: UserSeriveService, private router: Router) { }

  ngOnInit() {
    if (this.user.auth()) {
      this.router.navigate(['/core/home'])
    } else {
      console.log("you are't login ")
    }
  }
  onSignUp() {
    this.errSHow = false;


    if(this.auth.username != '' && this.auth.password != '' && this.auth.password2 != '' && this.auth.firstname != '' && this.auth.lastname != ''){
      if(this.auth.password === this.auth.password2){
        this.user.serviceSignUp(this.auth).subscribe(data => {
          this.user.setUserLogin(data);
    
          this.router.navigate(['/core/home'])
        }, err => {
          this.errSHow = true;
          this.getError = err.error.message;
        })
      }else{
        this.errSHow = true;
        this.getError = "Password != Password again";
      }
    }else{
      this.errSHow = true;
      this.getError = "Please enter all fields.";
    }

 


  }
  onCloseError() {
    this.errSHow = false
  }
}
