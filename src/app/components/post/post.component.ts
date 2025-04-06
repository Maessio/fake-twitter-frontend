import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';

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

  private currentUserId = Number(localStorage.getItem('userId'));
  private router = inject(Router);
  
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

      
      // lógica para deletar
      console.log('Delete post', this.post?.id);
    } else {
      // lógica para visualizar ou outra ação
      this.router.navigate(['/profile', this.post?.userId]);
      console.log('View post', this.post?.userId);
    }
  }
  
}
