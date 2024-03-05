import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentGuardianService {
  private baseUrl = 'https://localhost:44312/api/ParentsGuardians';
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

  getParentGuardian(): Observable<any[]> {
    if (!this.token) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
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
  

  createParentGuardian(parentGuardian: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, parentGuardian, { headers: this.getHeaders() });
  }
  updateParentGuardian(parentId: number, studentId: number, parentGuardian: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${parentId}/${studentId}`, parentGuardian, { headers: this.getHeaders() });
  }

  deleteParentGuardian(parentId: number, studentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${parentId}/${studentId}`, { headers: this.getHeaders() });
  }

  importParents(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/import`, formData, {
      headers: this.getHeaders(),
      reportProgress: true, 
      observe: 'events'    
    });
  }
}