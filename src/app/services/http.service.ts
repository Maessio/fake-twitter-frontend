import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private http = inject(HttpClient);
  private userProfileService = inject(UserProfileService);

  private baseURL = "http://localhost:8080";

  private token = this.userProfileService.getUserProfile()?.token ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6ImpvaG4zMjExQGV4YW1wbGUuY29tIiwiZXhwIjoxNzQzNzQ3ODY2fQ.dap2QlzpxGwuldxQIJcoPOuytZZctZRePnzqKO5lDT4";

  get<T>(path: string, params?: HttpParams): Observable<T> {
    const headers = this.token ? new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) : new HttpHeaders();
    return this.http.get<T>(this.baseURL + path, { headers, params });
  }

  post<T>(path: string, body: unknown): Observable<T> {
    const headers = this.token ? new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) : new HttpHeaders();
    return this.http.post<T>(this.baseURL + path, body, { headers });
  }

}
