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

    private baseURL = '/auth'
    
    private httpService = inject(HttpService);
    
    login(credentials: LoginRequest): Observable<LoginResponse> {
        localStorage.clear();

        const path = `${this.baseURL}/login`;

        return this.httpService.post<{ data: LoginResponse }>(path, credentials).pipe(
            map(response => response.data)
        );
    }

    logout(id: number) {
      const path = `${this.baseURL}/logout/${id}`;

      return this.httpService.post(path);
    }

    changeUserPassword(id: number, body: ChangePasswordRequest) {
      const path = `${this.baseURL}/change-password/${id}`;

      return this.httpService.put(path, body);
    }
}





