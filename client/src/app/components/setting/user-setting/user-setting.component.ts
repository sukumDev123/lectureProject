import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  userInfor : any = { firstname : '' , lastname : '' };
  constructor( private _user:UserSeriveService) { }

  ngOnInit() {
  
    this._user.userReq().subscribe(suc => {
      //this.userInfor = suc;
      //console.log(suc)
    })
  }

}
