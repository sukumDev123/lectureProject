import { Component, OnInit } from '@angular/core';
import { ErrorsPageService } from '../../../services/errors-page/errors-page.service';

@Component({
  selector: 'app-notfound-page',
  templateUrl: './notfound-page.component.html',
  styleUrls: ['./notfound-page.component.css']
})
export class NotfoundPageComponent implements OnInit {
  errorSMsg : object = {statusText : 'not found page ' , message : 'Can not find page you want or because not page '};

  constructor(private _error : ErrorsPageService) { }

  ngOnInit() {
  
  }
  errGetTrue(err){
    if(err) { 
      return true
    }
    return false
    
  }
}
