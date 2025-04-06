import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostComponent } from "../post/post.component";
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [PostComponent,NgForOf],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  @Input() postList?: Post[];
  @Input() isUserLogged?: boolean;
  @Input() page?: string;

}
