import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieSearchService } from '../movie-search.service.service';

@Component({
  selector: 'app-add-and-remove',
  templateUrl: './add-and-remove.component.html',
  styleUrls: ['./add-and-remove.component.scss']
})
export class AddAndRemoveComponent {
  @Input() movie: any;
  @Output() movieRemoved = new EventEmitter<void>();
  newMovie: any = {};
  showAddForm: boolean = false;

  constructor(private movieSearchService: MovieSearchService) { }

    toggleAddForm(){
        this.showAddForm = !this.showAddForm;
        this.newMovie = {};
    }

    addMovie(){
      console.log('Adding movie', this.newMovie);
        this.movieSearchService.addMovie(this.newMovie).subscribe(
            (response) => {
                console.log('Movie add successful', response);
                this.newMovie = {};
                this.toggleAddForm();
            },
            (error) => {
                console.error('Error adding movie', error);
            }
        )
    }

  removeMovie(title: string) {
    this.movieSearchService.removeMovie(title).subscribe(
      () => {
        console.log('Movie removed successfully');
        this.movieRemoved.emit(); 
      },
      (error) => {
        console.error('Error removing movie', error);
      }
    );
  }
}