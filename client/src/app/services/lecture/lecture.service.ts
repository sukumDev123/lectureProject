import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import localHost from '../../../app/static/http';
import 'rxjs/add/operator/map';
@Injectable()
export class LectureService {
  private host = localHost.host
  constructor(private _http: HttpClient) { }

  allLecture(): Observable<any> {
    return this._http.get<any>(`${this.host}/api/lecture/all`).map(res => res)
  }
  createLecture(lecture): Observable<object> {
    return this._http.post<object>(`${this.host}/api/lecture/create`, lecture).map(res => res)

  }
  stepAddLecture(id, lecture: object): Observable<object> {
    return this._http.put<object>(`${this.host}/api/lecture/updateStep/${id}`, lecture)
  }
  removeAddLecture(id, lecture: object): Observable<object> {
    return this._http.delete<object>(`${this.host}/api/lecture/updateStep/${id}`, lecture)
  }
  removeLecture(id): Observable<object> {
    return this._http.delete<object>(`${this.host}/api/lecture/remove/${id}` )
  }
  updateStatus(  id , id_user ): Observable<any> {
    return this._http.put<any>(this.host + '/api/lecture/updateStepStatus/'+id_user , { idStep: id } );
  }
  

}
