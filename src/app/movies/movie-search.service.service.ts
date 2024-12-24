import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  private apiUrl = 'http://localhost:8070/admin/getMovie';
  private apiUrl2 = 'http://localhost:8070/user/getAllMovies';
  private apiUrl3 = 'http://localhost:8070/admin/insertMovies';
  private apiUrl4 = 'http://localhost:8070/user/getAllMovies';
  private apiUrl5 = 'http://localhost:8070/admin/deleteMovies';
  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number = 1): Observable<any> {
    let params = new HttpParams();
    if (query) {
      params = params.set('searchQuery', query);
    }
    params = params.set('page', page.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl4}`);
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post(this.apiUrl, movie);
  }

  removeMovie(title: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${title}`);
  }

  getMyMovies(): Observable<any> { 
    return this.http.get(`${this.apiUrl2}`);
  }
  insertMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, movie);
  }
  deleteMovies(id: any): Observable<any> {
    return this.http.post(this.apiUrl5,id);
  }
}