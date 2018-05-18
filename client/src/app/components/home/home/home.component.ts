import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _userservice : UserSeriveService,private _router : Router) { }

  ngOnInit() {
    console.log(
    this._userservice.getUserLogin()
      
    )
  }
  createP(){
    if(this._userservice.auth()){
      this._router.navigate(['/user/lecture/add'])
    }else{
      this._router.navigate(['/auth/signup'])
    }
  }

}
