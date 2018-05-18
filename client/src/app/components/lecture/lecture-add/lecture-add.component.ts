import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture/lecture.service';

@Component({
  selector: 'app-lecture-add',
  templateUrl: './lecture-add.component.html',
  styleUrls: ['./lecture-add.component.css']
})
export class LectureAddComponent implements OnInit {
  lecture  = { nameL : '' , step : [] };
  stepList = [];
  msg : string ;
  show : boolean;
  step : string ;
  megClass : string ;
  constructor(private _lecture : LectureService) { }

   
  ngOnInit() {
  }
  create(){
    this.lecture.step = this.stepList;
    if(this.step == ''){
      this._lecture.createLecture(this.lecture).subscribe( (suc:any) => {
        this.msg = suc.message;
        this.megClass = 'sucMsg';
        this.lecture.nameL = ''
        this.lecture.step = []
        
      } , err => {
        this.msg = err.error.message;
        
        this.megClass = 'errMsg';
        
        console.log(err)
      })
    }
   console.log(this.lecture)
  }
  addStep(){
    if(this.step != ''){
      this.stepList.push({ step : this.step , status : false})
    }
    this.step = '';
  }
}
