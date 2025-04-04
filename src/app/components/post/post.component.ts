import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  
  @Input() post?: Post;


}
