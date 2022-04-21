import { Component, Input, OnInit } from '@angular/core';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Input() currentUserId : any;
  
  chatList : any[] = []

  constructor(
    private userService : UserService) { }

  ngOnInit(): void {
  
    //getting users for chat list 
    this.getUsers();

  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next : (res : any) => {
        this.chatList = res;
      },
      error : (err : any) => {
        console.log("Error getting users for chat list")
      }
    })
  }

}
