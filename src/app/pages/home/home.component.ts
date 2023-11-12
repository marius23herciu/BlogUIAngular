import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredPosts: Post [] = [] 

  latestPosts: Post [] = [] 

  searchResultPosts: Post [] = [] 

  searching = false

  searchString = ''

  radioOption = ''

  activeSearch = false

  constructor (private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadFeaturedPosts()
    this.loadLatestPosts()
  }

  loadFeaturedPosts(){
    this.postsService.loadFeaturedPosts().subscribe({
      next: (response) => {
        this.featuredPosts = response
        console.log(response)
  }})
  }
  loadLatestPosts(){
    this.postsService.loadLatestPosts().subscribe({
      next: (response) => {
        this.latestPosts = response
        console.log(response)
  }})
  }

  loadPostsBySearching(search: string){
    this.postsService.loadPostsBySearching(search).subscribe({
      next: (response) => {
        this.searching=true
        this.searchResultPosts = response
        console.log(response)
  }})
  }
}
