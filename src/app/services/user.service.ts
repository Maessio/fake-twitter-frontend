import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private httpService = inject(HttpService);

  loadUserProfile(id: number): Observable<UserProfile> {
    const path = `/users/${id}`;

    return this.httpService.get<{ data: UserProfile }>(path).pipe(
      map(response => response.data)
    );
  }

  loadUserPosts(id: number): Observable<any> {
    const path = `/users/${id}/posts`;

    return this.httpService.get<{ data: any }>(path).pipe(
      map(response => response.data)
    );
  }
}
