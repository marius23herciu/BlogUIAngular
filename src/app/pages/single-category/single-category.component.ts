import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  category = ''
  posts: Post [] = [ ] 

  constructor(private route: ActivatedRoute, private postsService: PostsService){}

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      console.log(val)
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        const categId = params.get('category')
        if(categId){
          this.loadPostsByCategory(categId)
        }
      }})
  }

  loadPostsByCategory(category: string){
    this.postsService.loadPostsByCategory(category).subscribe({
      next: (response) => {
        this.posts = response
        this.category = category
        console.log(this.posts)
        console.log(this.category)
  }})
  }

}
