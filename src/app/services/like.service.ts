import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  baseUrl:string = 'http://localhost:4000/api/likes'; 
  headers = new HttpHeaders({Accept: 'application/json'})

  constructor(private http : HttpClient) { }

  getLikesByParentId(idParent : any){
    return this.http.get(`${this.baseUrl}/byParent/${idParent}`, {headers : this.headers})
  }

  getLikesByUserId(idUser : any){
    return this.http.get(`${this.baseUrl}/byUser/${idUser}`, {headers : this.headers})
  }

  createOrDeleteLike(idUser : any, idParent : any){
    return this.http.post(`${this.baseUrl}/createOrDelete`,{idUser, idParent},{headers : this.headers})
  }

  deleteLike(idLike : any){
    return this.http.delete(`${this.baseUrl}/delete/${idLike}`,{headers : this.headers})
  }

  getLikesByUserAndParent(idUser : any, idParent : any){
    return this.http.get(`${this.baseUrl}/byUserAndParent`,
      {
        params : {
          idUser : idUser,
          idParent : idParent
        },
        headers : this.headers
    });
  }

}
