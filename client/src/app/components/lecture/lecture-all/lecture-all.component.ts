import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture/lecture.service';


@Component({
  selector: 'app-lecture-all',
  templateUrl: './lecture-all.component.html',
  styleUrls: ['./lecture-all.component.css']
})
export class LectureAllComponent implements OnInit {
  dataLecture = [];
  constructor(private _lecture : LectureService) { }

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
      this.dataLecture = suc
    },err => {
      console.log(err)
    })
  }
  dateNum(date){
    return this.check_min_7(date);
  }

  statusUpdate(index,id , index_big ){

    this._lecture.updateStatus(index,id).subscribe(suc => this.dataLecture[index_big].stepWork = suc , err => console.log(err))
  }

  deleteLecture(id , id_user){

    if(confirm("you want delete this") == true ){
      this.dataLecture.splice(id,1)
      this._lecture.removeLecture(id_user).subscribe(suc => console.log(suc) , err => console.log(err) )
    }

  }
  statusW(status) : string {

    if(status){
      return 'success'
    }
    return 'proceed'
  }

}
