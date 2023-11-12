import { UserCommentsService } from 'src/app/services/user-comments.service';
import { UserComment } from './../../models/user-comment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit{

  comments: UserComment[] = []
  showReplies = false
  newReply = false
  replyComments: UserComment[] = []
  showRepliesFor: string[] = []

  constructor(private userCommentsService: UserCommentsService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if(localStorage.getItem('postId')!=null){
      this.loadCommentsForPostId(localStorage.getItem('postId')!)
      this.loadReplyCommentsForPostId(localStorage.getItem('postId')!)
    }
    this.cd.detectChanges();
  }

  loadCommentsForPostId(postId: string){
   this.userCommentsService.loadCommentsForPostId(postId).subscribe({
    next: (response) =>
    this.comments = response
   })
  }
  loadReplyCommentsForPostId(postId: string){
    this.userCommentsService.loadReplyCommentsForPostId(postId).subscribe({
     next: (response) =>
     this.replyComments = response
    })
   }

  viewReplies(commentId: string){
    this.comments.forEach(comm => {
      if(comm.id==commentId){
        comm.showReplies=true
      }
    });
  }
  hideReplies(commentId: string){
    this.comments.forEach(comm => {
      if(comm.id==commentId){
        comm.showReplies=false
      }
    });
  }


  checkForReplies(mainCommentId: string){
    let hasReplyes = false;
    this.replyComments.forEach(comm => {
      if(comm.replyFor==mainCommentId){
        hasReplyes = true
      }
    });
    return hasReplyes
  }

  numberOfReplies(mainCommentId: string){
    let replies = 0;
    this.replyComments.forEach(comm => {
      if(comm.replyFor==mainCommentId){
        replies +=1
      }
    });
    return replies
  }

  giveReply(commentId: string){
    this.comments.forEach(comm => {
      if(comm.id==commentId){
        localStorage.setItem('replyToId', commentId)
        comm.replyNow=true
      }
    });
  }

  dontGiveReply(commentId: string){
    this.comments.forEach(comm => {
      if(comm.id==commentId){
        localStorage.removeItem('replyToId')
        comm.replyNow=false
      }
    });
  }
}
