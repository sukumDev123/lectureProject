import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  showNav_S = false
  constructor() { }

  ngOnInit() {
    
  }
  showNav_SF(){
    if(this.showNav_S === false){
      this.showNav_S = true
    }else{
      this.showNav_S = false
      
    }
  }
}
