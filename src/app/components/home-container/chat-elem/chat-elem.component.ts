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
  chat: import("/Users/robotx/Desktop/tekupApp-fronted/src/models/chat").Chat[] = [];
  chatLength!: number;
  

  constructor(
    private profilePicService :ProfilePicService,
    private utilService : UtilsService,public share:SharingService,public chatService:ChatService) { }

  ngOnInit(): void {
    //get chat member info
    this.getMemberInfo()
  
    //get chat member pfp
    this.getProfilePic()
    this.getChat()
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


  getChat()
  {
    let currentUserId = this.share.getUserSettings()._id

   this.chatService.getSingleChat(this.idMember,currentUserId).subscribe((chat)=>{
     this.chat=chat;
     this.chatLength=this.chat[0].currentUserSender.length
     console.log("length chat user",this.chatLength)
   })
  }
 

  sendUserInfoChat(userPic:any,reciverId:any)
  {

    

    let currentUserId = this.share.getUserSettings()._id
    console.log("sender  id",currentUserId)
    console.log("reciver id user",reciverId)

    let senderId=currentUserId
    this.chatService.getSingleChat(senderId,reciverId).subscribe((value)=>{
      this.conversation=value;
      console.log("converation in element",this.conversation)
    })

    
    
    this.share.setUserChat(this.conversation,reciverId,senderId)
    this.share.sendPic(userPic)
    
  }



}
