import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserSeriveService } from '../services/user-service/user-serive.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _user: UserSeriveService, private _router: Router) {

  }

  canActivate(): boolean {
    if (this._user.auth()) {
      
      return true
    }
    else {
      this._router.navigate(['/core/auth/signin'])
      return false
    }

  }
}
