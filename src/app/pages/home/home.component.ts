import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SearchResponse } from '../../interfaces/response/search-response.interface';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, CarouselComponent, FormsModule, RouterModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  @ViewChild('searchModal') searchModal!: ElementRef<HTMLDialogElement>;

  searchResults: SearchResponse[] = [];
  
  postList?: Post[];
  
  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private postService = inject(PostService);
  private userService = inject(UserService);

  ngOnInit(): void {

    if  (!this.postList) {
      this.loadRandomPosts();
    }
  }
    
  loadRandomPosts() {
    this.postService.randomPosts().subscribe({
      next: (posts) => {
        this.postList = posts;
      },
      error: (error) => {
        console.error('Error to load random posts:', error);
      }
    });
  }

  
  searchUsers(query: string): void {
    if (!query.trim()) {
      this.searchResults = [];
      return;
    }

    this.userService.searchUsers(query.trim()).subscribe({
      next: (users) => {
        this.searchResults = users;
        console.log(this.searchResults)
        this.searchModal?.nativeElement?.showModal();
      },
      error: (err) => {
        console.error('Error searching users:', err);
        this.searchResults = [];
      }
    });
  }

}
