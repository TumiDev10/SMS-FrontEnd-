import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44312/api/Auth';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password, role })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  logout(): Observable<any> {
    // Clear the token
    this.setToken(null);
    localStorage.removeItem('user');
    window.location.href = '/login'; 
    return of(null);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}