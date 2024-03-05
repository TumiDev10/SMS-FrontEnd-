import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44312/api/Users';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  setToken(token: string | null): void {
    this.token = token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  getUsers(): Observable<any[]> {
    // Check if token is set before making the request
    if (!this.token) {
      // If token is not set, attempt to retrieve it from storage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Set the token if retrieved from storage
        this.setToken(storedToken);
      } else {
        console.error('Login token not set.');
        return new Observable<any[]>(observer => {
          observer.error('Login token not set.');
        });
      }
    }
    
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  importUsers(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/import`, formData, { headers: this.getHeaders() });
  }
}

