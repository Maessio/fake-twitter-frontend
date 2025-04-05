import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private http = inject(HttpClient);

  private baseURL = "http://localhost:8080";
  
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
  
  put<T>(path: string, body?: unknown): Observable<T> {
    const token = localStorage.getItem('token');

    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put<T>(this.baseURL + path, body, { headers });
  }
}
