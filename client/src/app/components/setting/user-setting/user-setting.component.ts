import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  user: any = { firstname: '', lastname: '' };
  sucMsg: string = '';
  constructor(private _user: UserSeriveService , private _router : Router) { }

  ngOnInit() {

    this._user.userReq().subscribe(suc => {
      this.user = suc;

    }, err => {
      if (err.status === 401) {
        localStorage.removeItem('id_token');
        this._router.navigate(['/core/auth/signin'])

      }

    })
  }
  updateName() {
    this._user.editUser(this.user).subscribe(suc => {
      localStorage.removeItem('id_token');

      this._user.setUserLogin(suc);
      this.sucMsg = 'Update firstname and lastname done.';
    }, err => {
      console.log(err)
    })
  }
}
