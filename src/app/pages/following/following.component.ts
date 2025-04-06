import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-following',
  imports: [FooterComponent, CarouselComponent],
  templateUrl: './following.component.html',
  styleUrl: './following.component.css'
})
export class FollowingComponent implements OnInit{
  postList: any;

  private postService = inject(PostService);

  private currentUserId = Number(localStorage.getItem('userId'));

  ngOnInit(): void {

    if  (!this.postList) {
      this.loadFollowingPosts();
    }
  }

  loadFollowingPosts() {
    this.postService.followingPosts(this.currentUserId).subscribe({
      next: (posts) => {
        this.postList = posts;
      },
      error: (error) => {
        console.error('Error to load random posts:', error);
      }
    });
  }
}
