import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = 'http://localhost:4000/api/users'; 
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser : any; 
  
  users : any[] = [];

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}`);
  }
  
  createUser(data : any): Observable<any> {
    let url = `${this.baseUrl}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getCurrentUser(){
    return this.currentUser;
  }

  private getIndexById(id : string){
    for(let i = 0; i <this.users.length; i++){
      if(this.users[i].getId().match(id)){
        return i;
      }
    }
    return -1;
  }

  removeUser(id : string){
    this.users = this.users.splice(this.getIndexById(id), 1);
  }

  changeAuthState(id : any){
    let url = `${this.baseUrl}/changeAuthState/${id}`;
    console.log("changeAuthState UserService : ")
    return this.http.put(url,{headers: this.headers}).pipe(
      map((res)=>{
        return res || {}
      }),
      catchError(this.errorMgmt)
    );
  }

  getUser(idUser: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/read/${idUser}`, {headers: this.headers})
  }

  getUserByEmailAndPass(email : string, password : string) : Observable<any>{
    let url = `${this.baseUrl}/readByEmailAndPass/${email}/${password}`
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res)=>{
          this.currentUser = res
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
