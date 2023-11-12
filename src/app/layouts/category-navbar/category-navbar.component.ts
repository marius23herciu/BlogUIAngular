import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  categories: string[] = []

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    localStorage.removeItem('replyToId')
    this.loadCategories()
  }

  loadCategories(){
    this.categoriesService.loadCategories().subscribe({
      next: (response) => {
        this.categories = response
        console.log(response)
  }})
  }
}
