import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

  addSubscribers(sub: Sub): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiUrl + '/api/subscribers' , sub)
  }

 
}
