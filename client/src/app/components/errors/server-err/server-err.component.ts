import { Component, OnInit } from '@angular/core';
import { ErrorsPageService } from '../../../services/errors-page/errors-page.service';

@Component({
  selector: 'app-server-err',
  templateUrl: './server-err.component.html',
  styleUrls: ['./server-err.component.css']
})
export class ServerErrComponent implements OnInit {
  errorSMsg : object = {statusText : '' , message : ''};
  constructor(private _errors : ErrorsPageService) { }

  ngOnInit() {
    this.errorSMsg = this._errors.errMsg
    console.log(this.errorSMsg)
  }

}
