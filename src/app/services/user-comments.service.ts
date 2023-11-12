import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from '../models/comment-dto';
import { Observable } from 'rxjs';
import { UserComment } from '../models/user-comment';
import { ReplyCommentDto } from '../models/reply-comment-dto';

@Injectable({
  providedIn: 'root'
})
export class UserCommentsService {
  
  baseApiUrl = 'https://localhost:7246'

  constructor(private http: HttpClient) { }

  addComment(postId: string, commentDto: CommentDto): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiUrl + '/api/comments/' + postId , commentDto)
   }

   addReplyComment(postId: string, replyCommentDto: ReplyCommentDto): Observable<boolean> {
    return this.http.post<boolean>(this.baseApiUrl + '/api/comments/reply-at-' + postId , replyCommentDto)
   }

   loadCommentsForPostId(postId: string): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(this.baseApiUrl + '/api/comments/main-for-' + postId )
  }
  loadReplyCommentsForPostId(postId: string): Observable<UserComment[]> {
    return this.http.get<UserComment[]>(this.baseApiUrl + '/api/comments/replies-for-' + postId )
  }
}
