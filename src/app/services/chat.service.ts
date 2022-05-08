import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public http:HttpClient) { }

  baseUrl:string = 'http://localhost:4000/api/chats'; 
  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type' : 'multipart/form-data',
  })

  getSingleChat(senderId:any,reciverId:any):Observable<Chat[]>
  {
     return this.http.get<Chat[]>(this.baseUrl+"/"+"read"+"/"+senderId+"/"+reciverId);
  }

  getChats():Observable<Chat[]>
  {
     return this.http.get<Chat[]>(this.baseUrl);
  }

createChat(senderId:any,reciverId:any,chat:Chat):Observable<any>
  {
    return this.http.post(this.baseUrl+"/"+"create"+"/"+senderId+"/"+reciverId,chat, {observe: 'response'});
 }
}
