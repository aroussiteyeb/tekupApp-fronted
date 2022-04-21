import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  baseUrl:string = 'http://localhost:4000/api/gallery'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

  getGellery() {
    return this.http.get(`${this.baseUrl}`);
  }
}
