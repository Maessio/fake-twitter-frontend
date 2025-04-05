import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  postList?: Post[];
  
  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private postService = inject(PostService);

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

}
