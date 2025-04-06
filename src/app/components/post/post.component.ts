import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  
  @Input() post?: Post;
  @Input() isUserLogged?: boolean;
  @Input() page?: string;

  confirmDeleteOpen = false;

  modalOpen = false;
  modalTitle = '';
  modalMessage = '';

  router = inject(Router);
  private postService = inject(PostService);
  
  private currentUserId = Number(localStorage.getItem('userId'));
  
  ngOnInit(): void {
    if (!this.isUserLogged) {
      this.checkIfUserIsLogged();
    }
  }

  private checkIfUserIsLogged(): void {
    if (this.post?.userId === this.currentUserId) {
      this.isUserLogged = true;
      return;
    }

    this.isUserLogged = false;
  }

  onActionClick(): void {
    if (this.isUserLogged) {

      if (!this.post?.id){
        return;
      }

      this.postService.deletePost(this.post?.id).subscribe({
        next: (res) => {

          window.location.reload();
        },
        error: () => {

        }
      });
  
    } else {
      this.router.navigate(['/profile', this.post?.userId]);
    }
  }

  deletePost(): void {
    if (!this.post?.id) return;
  
    this.postService.deletePost(this.post.id).subscribe({
      next: () => {
        this.confirmDeleteOpen = false;
        window.location.reload();
      },
      error: () => {
        // Você pode exibir um toast, ou modal de erro
        this.confirmDeleteOpen = false;
      }
    });
  }

  showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalOpen = true;
  }
  
}
