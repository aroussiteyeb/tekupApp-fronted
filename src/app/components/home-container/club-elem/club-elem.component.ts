import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-club-elem',
  templateUrl: './club-elem.component.html',
  styleUrls: ['./club-elem.component.css']
})
export class ClubElemComponent implements OnInit {

  
  joinIcon = faCheckCircle;

  constructor() { }

  ngOnInit(): void {
  }


}
