import { Component, OnInit } from '@angular/core';
import { CommentDto } from 'src/app/models/comment-dto';
import { ReplyCommentDto } from 'src/app/models/reply-comment-dto';
import { UserCommentsService } from 'src/app/services/user-comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  comment: CommentDto = {
    name: '',
    comment: '',
  }
  replyComment: ReplyCommentDto = {
    name: '',
    comment: '',
    replyFor: ''
  }
  postId = localStorage.getItem('postId')
  replyToId = ''
  
  

  constructor(private userCommentsService: UserCommentsService) {}

  ngOnInit(): void {
    if(localStorage.getItem('replyToId')){
      this.replyToId = localStorage.getItem('replyToId')!
    }
  }

  postComment(postId: string, comment: CommentDto){
    this.userCommentsService.addComment(postId, comment).subscribe({
      next: (response) => {
        console.log(response)
        if ( response ){
          alert('New comment added. If the admin approves your comment, it will appear on this post comment section.')
          this.comment.comment=' '
        }
        else{
          alert('Something went wrong! Try again later.')
        }
      }
    })
  }
  postReplyComment(postId: string, replyComment: ReplyCommentDto){
    replyComment.replyFor=this.replyToId
    this.userCommentsService.addReplyComment(postId, replyComment).subscribe({
      next: (response) => {
        console.log(response)
        if ( response ){
          alert('New reply comment added. If the admin approves your reply, it will appear on this post comment section.')
          this.replyComment.comment=' '
        }
        else{
          alert('Something went wrong! Try again later.')
        }
      }
    })
  }
}
