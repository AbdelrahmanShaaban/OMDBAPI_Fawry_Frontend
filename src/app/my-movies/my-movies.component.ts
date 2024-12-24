import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service.service';
import { MovieSearchService } from '../movies/movie-search.service.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {
  myMovies: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  role:any
  constructor(private movieSearchService: MovieSearchService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.getMyMovies();
  }

  getMyMovies() {
    this.loading = true;
    this.error = null;
    this.movieSearchService.getMyMovies().subscribe({
      next: (data: any) => {
        if (data && data.body && data.body.Response === "True") {
          this.myMovies = data.body.Search;
        } else {
          this.myMovies = [];
          if (data && data.body && data.body.Error) {
            this.error = data.body.Error;
          } else {
            this.error = "No movies found or invalid response";
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to fetch movies';
        this.loading = false;
      }
    });
  }
}