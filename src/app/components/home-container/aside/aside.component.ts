import { Component, OnInit } from '@angular/core';
import { faBars, faChessRook, faHome, faTasks, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  lowMenuIcon = faBars;
  homeIcon = faHome;
  groupsIcon = faUsers;
  eventsIcon = faTasks;
  clubsIcon = faChessRook;
  featsIcon = faTrophy;

  constructor() { }
  
  ngOnInit(): void {
  }

}
