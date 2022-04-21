import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = 'http://localhost:4000/api/comments'; 
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

  getCommentsByParentId(idParent : any){
    return this.http.get(`${this.baseUrl}/read/byParentId/${idParent}`);
  }

  postComment(commentBody : any){
    return this.http.post(`${this.baseUrl}/create`, commentBody);
  }

  // deleteComment(commentId : any){
  //   return this.http.delete(`${this.baseUrl}/delete/${commentId}`, {headers : this.headers});
  // }
  
}
