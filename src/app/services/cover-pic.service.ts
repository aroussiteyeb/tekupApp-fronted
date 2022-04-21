import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoverPicService {

  baseUrl:string = 'http://localhost:4000/api/coverPics'; 
  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type' : 'multipart/form-data',
  })

  constructor(private http : HttpClient) {}

  addCoverPic(pfp : any){
    return this.http.post(`${this.baseUrl}/create`, pfp);
  }

  getCoverPic(idUser : any){
    return this.http.get(`${this.baseUrl}/read/${idUser}`, {headers : new HttpHeaders({accept : 'application/json'})});
  }

}
