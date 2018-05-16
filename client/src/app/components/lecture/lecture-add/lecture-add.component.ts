import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture-add',
  templateUrl: './lecture-add.component.html',
  styleUrls: ['./lecture-add.component.css']
})
export class LectureAddComponent implements OnInit {
  lecture  : object= {}
  show : boolean;
  constructor() { }

  ngOnInit() {
  }

}
