import { Injectable } from '@angular/core';
import { Chat } from 'src/models/chat';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
 

  private storageName: string = "Settings";
  userData: any;
  userPic: any;
  conversation: Chat[] = [];
  reciverChatId: any;

  constructor() { }
  
  setUserChat(conversation: Chat[],reciverId:any) {

    this.conversation=conversation
    this.reciverChatId=reciverId
   }

  setSettings(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  getUserSettings() {
    let data : any = localStorage.getItem(this.storageName);
    return JSON.parse(data);
  }

  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

  userSettingsAreSet(){
    return localStorage.getItem(this.storageName);
  }

  setUserData(userData:any)
  {
    return this.userData=userData
  }

  sendPic(userPIc:any)
  {
    return this.userPic=userPIc
  }
}
