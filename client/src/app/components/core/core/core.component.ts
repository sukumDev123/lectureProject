import { Component, OnInit } from '@angular/core';
import { UserSeriveService } from '../../../services/user-service/user-serive.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(public _userservice : UserSeriveService) { }

  ngOnInit() {
  }

}
