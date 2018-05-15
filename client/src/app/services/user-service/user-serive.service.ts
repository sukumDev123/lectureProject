import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import localHost from '../../../app/static/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserSeriveService {
  private host = localHost.host;
  public userisLogin: object = {};
  constructor(private http: HttpClient, private router: Router) {

  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.host + '/test/user');
  }
  serviceSignUp(data: object): Observable<any> {
    return this.http.post<any>((this.host + '/api/auth/signup'), data)
    //.catch(this.errHeader)
  }
  serviceSignIn(data: object): Observable<object> {
    return this.http.post<object>((this.host + '/api/auth/signin'), data);
  }

  userReq() {
    return this.http.get(`${this.host}/api/auth/usernow`, { withCredentials: true });

  }
  setUserLogin(user): void {
    localStorage.setItem('id_token', user.id_token);
  }
  getUserLogin() {
    return localStorage.getItem('id_token')
  }
  auth(){
    return  !!localStorage.getItem('id_token')
  }
  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
    this.router.navigate(['/auth/signin']);

  }
}
