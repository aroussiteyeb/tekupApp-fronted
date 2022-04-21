import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {

  baseUrl:string = 'http://localhost:4000/api/profilePics'; 
  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type' : 'multipart/form-data',
  })

  constructor(private http : HttpClient) {}

  addProfilePic(pfp : any){
    return this.http.post(`${this.baseUrl}/create`, pfp);
  }

  getProfilePic(idUser : any){
    return this.http.get(`${this.baseUrl}/read/${idUser}`, {headers : new HttpHeaders({accept : 'application/json'})});
  }

}
