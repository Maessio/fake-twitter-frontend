import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private http = inject(HttpClient);

  private baseURL = environment.apiUrl;
  
  get<T>(path: string, params?: HttpParams): Observable<T> {
    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<T>(this.baseURL + path, { headers, params });
  }
  
  post<T>(path: string, body?: unknown): Observable<T> {
    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post<T>(this.baseURL + path, body, { headers });
  }
  
  delete<T>(path: string, body?: unknown): Observable<T> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<T>(this.baseURL + path, { headers, body });
  }

  put<T>(path: string, body?: unknown): Observable<T> {
    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put<T>(this.baseURL + path, body, { headers });
  }
}
