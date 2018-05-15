import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSeriveService } from './services/user-service/user-serive.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _user:UserSeriveService) {
    //this.httpClient.get('http://localhost:3000/test').subscribe(data => })

  }
}
