import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:44312/api/Students';
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

  getStudent(keyword?: string): Observable<any[]> {
    let url = this.baseUrl;
    if (keyword) {
      url += `?keyword=${keyword}`;
    }
  
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

    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  createStudent(student: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, student, { headers: this.getHeaders() });
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, student, { headers: this.getHeaders() });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  importStudents(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/import`, formData, {
      headers: this.getHeaders(),
      reportProgress: true, 
      observe: 'events'   
    });
  }
}