import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture/lecture.service';
import { Router } from '@angular/router';

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
  stepInput: string ; 
  megClass : string ;
  constructor(private _lecture : LectureService , private _router : Router ){ }

   
  ngOnInit() {
  }
  create(){
    this.lecture.step = this.stepList;
    if(this.stepInput == ''){
      this._lecture.createLecture(this.lecture).subscribe( (suc:any) => {
        this.msg = suc.message;
        this.megClass = 'sucMsg';
        this.lecture.nameL = '';
        this.lecture.step = [];
        this.stepList = [];
      } , err => {
        this.msg = err.error.message;
        this.megClass = 'errMsg';
        if (err.status === 401) {
          localStorage.removeItem('id_token');
          window.alert("Session expired !");
          this._router.navigate(['/core/auth/signin'])
  
        }
      })
    }
  }
  addStep(){

    if(this.stepInput != undefined && this.stepInput != ''){
      this.stepList.push({ step : this.stepInput , status : false})
      this.stepInput = '';
    }
   
  }
  removeStep(index) { 
    this.stepList.splice(index,1)
  }
}
