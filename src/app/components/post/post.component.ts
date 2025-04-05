import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  
  @Input() post?: Post;

  isUserLogged = false;

  private currentUserId = Number(localStorage.getItem('userId'));
  
  ngOnInit(): void {
    this.checkIfUserIsLogged();
  }

  private checkIfUserIsLogged(): void {
    if (!this.post?.userId) {
      this.isUserLogged = true;
      return;
    }

    this.isUserLogged = this.post.userId === this.currentUserId;
  }

  onActionClick(): void {
    if (this.isUserLogged) {
      // lógica para deletar
      console.log('Delete post', this.post?.id);
    } else {
      // lógica para visualizar ou outra ação
      console.log('View post', this.post?.id);
    }
  }
  
}
