import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  currentUserId : any

  constructor(private sharingService : SharingService) { }

  ngOnInit(): void {
    this.getCurrentUserId()
  }

  getCurrentUserId(){
    this.currentUserId = this.sharingService.getUserSettings()._id
  }

}
