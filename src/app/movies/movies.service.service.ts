import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private apiUrl = 'http://localhost:8070/user'; 
  constructor(private http: HttpClient) {}
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/'getMoviesById?'${id}`);
  }
}