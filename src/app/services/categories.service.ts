import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }
  
loadCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseApiUrl + '/api/categories' )
}
}
