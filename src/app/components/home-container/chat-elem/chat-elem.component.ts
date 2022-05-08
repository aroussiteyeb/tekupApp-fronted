import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-chat-elem',
  templateUrl: './chat-elem.component.html',
  styleUrls: ['./chat-elem.component.css']
})
export class ChatElemComponent implements OnInit {

  @Input() chatMember : any;
  
  idMember : any;
  memberName : any;
  memberLastName : any;
  pfpPath ?: string;
  conversation: import("/Users/robotx/Desktop/tekupApp-fronted/src/models/chat").Chat[] = [];
  

  constructor(
    private profilePicService :ProfilePicService,
    private utilService : UtilsService,public share:SharingService,public chatService:ChatService) { }

  ngOnInit(): void {
    //get chat member info
    this.getMemberInfo()
  
    //get chat member pfp
    this.getProfilePic()
  }

  getMemberInfo(){
     //get chat member id
     this.idMember = this.chatMember._id

     //get chat member name and last name
     this.memberName = this.chatMember.name;
     this.memberLastName = this.chatMember.lastName
  }

  getProfilePic(){
    this.profilePicService.getProfilePic(this.idMember).subscribe({
      next : (res : any) => {
        this.pfpPath = this.utilService.base64ToPic(res?.pfp)
      },
      error : (err : any) => {
        console.log("Error getting pfp in chat elem for member "+this.idMember)
      }
    })
  }

  sendUserInfoChat(userPic:any,reciverId:any)
  {

    let currentUserId = this.share.getUserSettings()._id
    console.log("sender  id",currentUserId)
    console.log("reciver id user",reciverId)

    let senderId=currentUserId
    this.share.sendPic(userPic)
    this.chatService.getSingleChat(senderId,reciverId).subscribe((value)=>{
      this.conversation=value;
      this.share.setUserChat(this.conversation,reciverId)
      console.log("converation",this.conversation)
    })
  }



}
