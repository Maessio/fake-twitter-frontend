import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { Post } from '../../interfaces/post';
import { PostComponent } from "../../components/post/post.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, CommonModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageList: string[] = ["https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"]
  postList: Post[] = [
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    },
    {
      username: 'Jane_doe',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere, officia minima, perferendis iusto iure consectetur laudantium soluta corporis aspernatur exercitationem magnam alias eos? Natus nihil est officia ratione cupiditate'
    }
  ]
}
