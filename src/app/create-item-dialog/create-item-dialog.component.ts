import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Item, Category } from '../item.model';
import { GroupService } from '../group.service';
import { ApiProductService, IMovieApi } from '../api-product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {
  itemForm: FormGroup;

  // String of the form http://www.omdbapi.com/?apikey=b192c98a&s=batman
  autoCompleteOptions: IMovieApi[] = []
  moviePosterUrl: string;

  constructor(
    private productApi : ApiProductService,
    private userService: UserService,
    private fb: FormBuilder
    ){};
  
  ngOnInit() {
    // Subscribe to movieData$ from Product API Service
    this.productApi.movieData$.subscribe(movieData => {
      // Set autoCompleteOptions to movie data result
      this.autoCompleteOptions = movieData;
    });

    // Setup name-value pairs that are retrieved from the form
    this.itemForm = this.fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      userDescription: new FormControl('')
    })

    // Subscribe to changes on title FormControl
    this.itemForm.get('title').valueChanges.subscribe(inputValue => 
      {
        // Get movie data from service
         this.productApi.fetchMovieData(inputValue);
      })

  }

  onSubmitItem(title: string, category: Category, userDescription: string): void {
    this.userService.addItemToCurrGroup(title, category, userDescription);
  }


}
