import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile.interface';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private httpService = inject(HttpService);
  private baseURL = '/posts'

  createPost(userId: number, content: string) {
    const path = `${this.baseURL}/${userId}`;

    const body = {
      content: content
    }

    return this.httpService.post(path, body);
  }

  deletePost(postId: number) {
    const path = `${this.baseURL}/${postId}`;

    return this.httpService.delete(path);
  }

  randomPosts(): Observable<Post[]> {
    const path = `${this.baseURL}/random`;

    return this.httpService.get<{ data: Post[] }>(path).pipe(
      map(response => response.data)
    );
  }

  followingPosts(id: number): Observable<Post[]> {
    const path = `${this.baseURL}/${id}/following`;

    return this.httpService.get<{ data: Post[] }>(path).pipe(
      map(response => response.data)
    );
  }
}
