import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl:string = 'http://localhost:4000/api/events'; 
  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type' : 'multipart/form-data',
  })

  constructor(private http : HttpClient) { }
   
// Create
  createEvent(data : any): Observable<any> {
    let url = `${this.baseUrl}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Create interraction
  createInterraction(idEvent:any,type:any,data : any): Observable<any> {
    let url = `${this.baseUrl}/create/${idEvent}/${type}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

    // dekete interraction
    deleteInetrraction(idEvent:any,type:any,data : any): Observable<any> {
      let url = `${this.baseUrl}/delete/${idEvent}/${type}`;
      return this.http.post(url, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  


  //Get events by user Id
  getEventsByUser(idUser : any){
    return this.http.get(`${this.baseUrl}/byUserId/${idUser}`)
  }

  // Get all Events
  getEvents() {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get Event
  getEvent(id: any): Observable<any> {
    let url = `${this.baseUrl}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res)=> {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update Event
  updateEvent(id : any, data : any): Observable<any> {
    let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete Event
  deleteEvent(id : any): Observable<any> {
    let url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
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
    return throwError(()=> new Error(errorMessage));
  }
}
