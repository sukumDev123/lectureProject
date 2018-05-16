import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import localHost from '../../../app/static/http';

@Injectable()
export class LectureService {
  private host = localHost.host
  constructor(private _http: HttpClient) { }

  allLecture(): Observable<any> {
    return this._http.get<any>(`${this.host}/api/lecture/all`)
  }
  createLecture(lecture): Observable<object> {
    return this._http.post<object>(`${this.host}/api/lecture/create`, lecture)

  }
  stepAddLecture(id, lecture: object): Observable<object> {
    return this._http.put<object>(`${this._http}/api/lecture/stempAdd/${id}`, lecture)
  }
  removeAddLecture(id, lecture: object): Observable<object> {
    return this._http.delete<object>(`${this._http}/api/lecture/stempAdd/${id}`, lecture)
  }
  removeLecture(id, lecture: object): Observable<object> {
    return this._http.delete<object>(`${this._http}/api/lecture/remove/${id}`, lecture)
  }


}
