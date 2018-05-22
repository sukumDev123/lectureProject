import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsPageService {
  errMsg : object = {};
  constructor(private _router :Router) { }
  pageOn(err){
    this.errMsg = err;    
    if(err.status == 0){
      this._router.navigate(['/server/err'])
    }else if(err.status == 404){
      this._router.navigate(['/not/found'])
    }

  }
  
}
