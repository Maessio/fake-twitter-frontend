import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { LoginRequest } from '../interfaces/request/login-request.interface';
import { LoginResponse } from '../interfaces/response/login-response.interface';
import { ChangePasswordRequest } from '../interfaces/request/change-password-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    private httpService = inject(HttpService);

    login(credentials: LoginRequest): Observable<LoginResponse> {
        const path = `/auth/login`;

        return this.httpService.post<{ data: LoginResponse }>(path, credentials).pipe(
            map(response => response.data)
        );
    }

    changeUserPassword(body: ChangePasswordRequest): Observable<void> {
        const id = localStorage.getItem('userId');

        const path = `/auth/${id}/change-password`;
    
        return this.httpService.put<void>(path, body);
      }
}





