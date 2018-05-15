import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _userservice : UserSeriveService) { }

  ngOnInit() {
    console.log(
    this._userservice.getUserLogin()
      
    )
  }

}
