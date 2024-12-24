import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddAndRemoveComponent } from './add-and-remove/add-and-remove.component'; 

@NgModule({
  declarations: [MovieListComponent, MovieDetailsComponent, MovieSearchComponent, AddAndRemoveComponent],
  imports: [CommonModule, RouterModule, FormsModule], 
  exports: [MovieListComponent, MovieDetailsComponent, MovieSearchComponent]
})
export class MoviesModule { }