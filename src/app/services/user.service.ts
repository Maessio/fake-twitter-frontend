import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile.interface';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseURL = '/users';

  private httpService = inject(HttpService);


  loadUserProfile(id: number): Observable<UserProfile> {
    const path = `${this.baseURL}/${id}`;

    return this.httpService.get<{ data: UserProfile }>(path).pipe(
      map(response => response.data)
    );
  }

}
