import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {

  currentUserId : any
  resizbale: boolean=false;
  showChat: boolean=true;
  userData: any;

  constructor(private sharingService : SharingService,public share:SharingService) { }

  ngOnInit(): void {
    this.getCurrentUserId()
    this.getUserData()
  }

  getCurrentUserId(){
    this.currentUserId = this.sharingService.getUserSettings()._id
    console.log(this.currentUserId)
  }


  chatResize()
  {
    console.log("chat",this.resizbale)
    if(this.resizbale==true)
    {
      this.resizbale=false
    }else{

      this.resizbale=true


    }

    
  }

  getUserData()
  {
   this.userData=this.share.userData
   console.log("userData",this.userData)
  }

  closeChat()
  {
    this.showChat=false
  }

}
