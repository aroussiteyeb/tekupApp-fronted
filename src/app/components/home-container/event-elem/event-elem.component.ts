import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faCheck, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-elem',
  templateUrl: './event-elem.component.html',
  styleUrls: ['./event-elem.component.css']
})
export class EventElemComponent implements OnInit {

  interestedIcon = faStar;
  notInterestedIcon = faTimes;
  goingIcon = faCheck;

  selectedParticipation = "";

  @ViewChildren("reactions") private reactions ?: QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {

  }

  resetLists(){
    this.reactions?.forEach(elem => elem.nativeElement.classList.remove('selected'));
  }

  selectedReact(reactionsIndex : number){
    this.resetLists();
    this.reactions?.get(reactionsIndex)?.nativeElement.classList.toggle('selected');
    this.selectedParticipation = reactionsIndex==0?"notInterested":reactionsIndex==1?"interested":"going";
  }
}
