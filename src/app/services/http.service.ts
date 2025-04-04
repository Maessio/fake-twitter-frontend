import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  // Método genérico para realizar requisições GET
  get<T>(url: string, token?: string, params?: HttpParams): Observable<T> {
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<T>(url, { headers, params });
  }

  // Método genérico para realizar requisições POST
  post<T>(url: string, body: any, token?: string): Observable<T> {
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post<T>(url, body, { headers });
  }

  // Outros métodos como PUT, DELETE podem ser adicionados aqui
}
