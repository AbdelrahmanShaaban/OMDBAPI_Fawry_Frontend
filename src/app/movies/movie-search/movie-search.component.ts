
import { Component, ViewChild } from '@angular/core';
import { MovieSearchService } from '../movie-search.service.service';
import { Router } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  role: any;
  movieAdded: boolean = false;
  addedMovie: any;
  myflag: boolean = false;
  AllFlag: boolean = false;


  constructor(
    private movieSearchService: MovieSearchService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  search() {
    this.loading = true;
    this.error = null;
    console.log("role",this.role)
    if(this.role=="ROLE_USER"||this.myflag){
      this.movieSearchService.getAllMovies().subscribe({
        next: (response) => {
          console.log('All movies:', response);
          this.searchResults = response.body;
          this.loading = false;
        }
      })
    }
    else if (this.role=="ROLE_ADMIN"||this.AllFlag){
      this.movieSearchService.searchMovies(this.searchQuery).subscribe({
        next: (response) => {
          if (response && response.body && response.body.Response === "True") {
            this.searchResults = response.body.Search;
          } else {
            this.searchResults = [];
            if (response && response.body && response.body.Error) {
              this.error = response.body.Error;
            } else {
              this.error = "No results found or invalid response";
            }
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Search failed';
          this.loading = false;
        },
      });
    }

  }

  openMovieDetails(result: any) {
   let id:any= result.imdbID;
   console.log("result",result)
   localStorage.setItem('movieDetails', JSON.stringify(result));
   if(this.role=="ROLE_USER"){
    this.router.navigate(['/movies',id]);
   }
  }

  onAddMovie(movie: any) {
    console.log('Adding movie', movie);
    if (this.movieAdded) {
      alert("Only one movie can be added.");
      return;
    }

    this.movieSearchService.insertMovie([movie]).subscribe({
      next: (response) => {
        console.log('Movie added to backend:', response);
        this.movieAdded = true;
        this.addedMovie = movie;
        alert("Movie added successfully");
      },
      error: (error) => {
        console.error('Error adding movie to backend:', error);
        if (error.status === 409) {
          alert("This movie is already added");
        } else {
          alert("Error adding movie");
        }
      }
    });
  }

  resetAddedMovie() {
    this.movieAdded = false;
    this.addedMovie = null;
  }


  getPoster(movie: any): string {
    return movie.Poster || movie.poster;
  }

  getTitle(movie: any): string {
    return movie.Title || movie.title;
  }

  getType(movie: any): string {
      return movie.Type || movie.type
  }
    getCountry(movie: any): string {
      return movie.Country || movie.country
  }
    getYear(movie: any): string {
      return movie.Year || movie.year
  }

  getMyMovies(){
    this.myflag = true;
    this.AllFlag = false;
    this.search()
  }
  geALLyMovies(){
    this.AllFlag = true;
    this.myflag = false;
    this.search()
  }

  deletMovies(move:any){
    console.log("move",move)
    this.movieSearchService.deleteMovies([move.imdbID]).subscribe({
      next: (response) => {
        console.log('Movie deleted from backend:', response);
        this.search();
        alert("Movie deleted successfully");
      },
      error: (error) => {
        console.error('Error deleting movie from backend:', error);
        alert("Error deleting movie");
      }
    })
  }

}



