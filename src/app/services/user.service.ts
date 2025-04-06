import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile.interface';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { SearchResponse } from '../interfaces/response/search-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseURL = '/users';
  
  private httpService = inject(HttpService);
  
  loadUserProfile(currentUserId: number, userId?: number) {
    let path: string;
    
    
    if (userId && userId != currentUserId) {
      path = `${this.baseURL}/${currentUserId}?userId=${userId}`;
    } else {
      path = `${this.baseURL}/${currentUserId}`;
    }
    
    
    return this.httpService.get<{ data: UserProfile }>(path).pipe(
      map(response => response.data)
    );
  }
  
  followUser(currentUserId: number, userId: number) {
    const path = `${this.baseURL}/${currentUserId}/follow/${userId}`;
    
    return this.httpService.post(path);
  }
  
  unfollowUser(currentUserId: number, userId: number) {
    const path = `${this.baseURL}/${currentUserId}/unfollow/${userId}`;
    
    return this.httpService.delete(path);
  }
  
  searchUsers(query: string): Observable<SearchResponse[]> {
    const path = `${this.baseURL}/search`;

    const params = new HttpParams().set('username', query);

    return this.httpService.get<{ data: SearchResponse[] }>(path, params).pipe(
      map(response => response.data)
    );
  }

}
