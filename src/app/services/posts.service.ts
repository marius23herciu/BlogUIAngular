import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  baseApiUrl = 'https://localhost:7246'
  currentPostId = localStorage.getItem('postId')!

  constructor(private http: HttpClient) { }

  loadFeaturedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/featured' )
}

  loadLatestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/latest' )
}

loadPostsByCategory(category: string): Observable<Post[]> {
  return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/by-' + category )
}

loadPostById(id:string, reload: boolean):Observable<Post> {
  return this.http.get<Post>(this.baseApiUrl + '/api/posts/post-' + id + '-' + reload )
}

  load4SimilarPosts(category: string, postId: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/similar-posts-' + category + '-without-' + postId )
  }

  loadPostsBySearching(search: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseApiUrl + '/api/posts/' + search )
  }
}
