import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture/lecture.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lecture-all',
  templateUrl: './lecture-all.component.html',
  styleUrls: ['./lecture-all.component.css']
})
export class LectureAllComponent implements OnInit {
  dataLecture = [];
  dateKeep = [];
  size : number = 3;
  total : number = 0;
  pageNum : any = [];
  showList : boolean = false;
  showListDB : boolean = true;
  classNow : string;
  step : string;
  stepIndex : number;
  constructor(private _lecture : LectureService , private _router : Router) { }

  check_min_7(date) {
    let date_start = new Date(date).toString();
    let date_end = new Date().toString();
    var startA = Date.parse(date_start);
    var endA = Date.parse(date_end)
    var gg = endA - startA;
    var num_days = ((gg % 31536000000) % 2628000000) / 86400000; // day
    let res = 0;
    res = Math.round(num_days); // day
    return res;
  }
 
  ngOnInit() {
    this._lecture.allLecture().subscribe(suc => {
      if(suc.length == 0){
        this.showListDB = false;
      }else{
        this.dateKeep = suc;
        this.total = this.dateKeep.length;
        this.showListDB = true;
        this.startLectureKeep(1);
        this.pageNum =  this.number_show(0)
        
      }
    },err => {
      console.log(err)
    })
  }


  page_size () {
    return Math.ceil(this.total / this.size); /** num page total */
  }
 number_show(n) { /** page number */
    let num_input = this.page_size();
    let t = []
    let num = 0;
    for (var i = 0; i < num_input; i++) {
        t.push(i + 1);
    }
    let tl = t.slice(0, 3)
    if (n >= tl.length) {
        tl = t.slice(n - 2, n + 1);
    }
    return tl;

}

  /**start  */

  startLectureKeep(start){
    let begin = (start - 1) * this.size;
    let end = begin + this.size;
    this.dataLecture = this.dateKeep.slice(begin , end );
    
  }
  pageShow(num){
    this.pageNum =  this.number_show(num)
    this.startLectureKeep(num);
  }



  dateNum(date){
    return this.check_min_7(date);
  }

  statusUpdate(index,id , index_big ){
    /** status update */
    this._lecture.updateStatus(index,id).subscribe(suc => this.dataLecture[index_big].stepWork = suc , err => console.log(err))
  }

  deleteLecture(id , id_user){

    if(confirm("you want delete this") == true ){
      this.dateKeep.splice(id,1)
      this._lecture.removeLecture(id_user).subscribe(suc => console.log(suc) , err => console.log(err) )
      this.startLectureKeep(1);
      this.pageNum =  this.number_show(0);
      this.total = this.dateKeep.length;
      if(this.dateKeep.length == 0){
        this.showListDB = false;
        
      }
    }

  }
  statusW(status) : string {

    if(status){
      return 'success'
    }
    return 'proceed'
  }
  addStep( stepW , index) {

    let id_lecture = stepW._id;
    let stepWork = stepW.stepWork;
    stepWork.push({step : this.step , status : false})
    this._lecture.stepAddLecture(id_lecture , stepWork).subscribe(suc => this.step = '' , err => console.log(err) )
    
  }

  createP(){
    this._router.navigate(['/user/lecture/add'])
  }
}
