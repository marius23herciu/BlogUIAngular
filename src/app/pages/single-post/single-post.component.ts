import { UserComment } from './../../models/user-comment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentListComponent } from 'src/app/comments/comment-list/comment-list.component';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Post = {
    id: '',
    title: '',
    permalink: '',
    category: '',
    postImgPath: '/assets/img/img-placeholder.jpg',
    excerpt: '',
    content: '',
    isFeatured: false,
    views: 0,
    userComments:  [],
    status: 0,
    createdAt: new Date() 
}
  reload = false
  similarPosts: Post [] = []
  
  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      console.log(val)
    })
    
    this.route.paramMap.subscribe({
      next: (params) => {
        const postId = params.get('id')
        if(postId){
          localStorage.setItem('postId', postId)
          setTimeout(()=>{                        
            this.loadPostFromParam(postId, this.reload)
        }, 150);
          

          console.log(this.postsService.currentPostId)
          
          if(this.postsService.currentPostId!= postId){
            this.reload=true
            location.reload()
          }
          this.reload=false
          setTimeout(()=>{                        
            this.loadSimilarPosts(this.post.category, this.post.id)
            this.reload=false
        }, 500);
        }
      }})
  }

  loadPostFromParam(id: string, reload: boolean){
    console.log(id);
    console.log(reload)
    this.postsService.loadPostById(id, reload).subscribe({
      next: (response) => {
        this.post = response
        console.log(response)
  }})
  }

  loadSimilarPosts(category: string, postId: string){
    this.postsService.load4SimilarPosts(category, postId).subscribe({
      next: (response) => {
        console.log(this.similarPosts)
        this.similarPosts = response
      }
    })
  }

}
