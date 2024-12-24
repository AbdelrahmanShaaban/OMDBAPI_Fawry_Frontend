import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}
  
  ngOnInit() {
    // this.movie = JSON.parse(localStorage.getItem('movieDetails')||'{}');
    this.movie = JSON.parse(localStorage.getItem('movieDetails') || '{}');
    console.log("this.movie",this.movie)
    // const id = +this.route.snapshot.paramMap.get('id')!;
    // this.moviesService.getMovieDetails(id).subscribe((movie) => {
    //   this.movie = movie;
    // });
  }
}