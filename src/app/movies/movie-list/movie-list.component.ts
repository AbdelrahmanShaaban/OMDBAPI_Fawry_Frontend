import { Component } from '@angular/core';
import { MoviesService } from '../movies.service.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  movies: any[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
}