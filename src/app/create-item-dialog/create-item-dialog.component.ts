import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Item, Category } from '../item.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ApiProductService } from '../api-product.service';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {
  itemForm: FormGroup;

  // String of the form http://www.omdbapi.com/?apikey=b192c98a&s=batman
  private _url: string = '';
  // Create string with options for autocomplete
  autoCompleteOptions: string[] = []

  constructor(
    private productApi : ApiProductService,
    private http: HttpClient,
    private groupService: GroupService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateItemDialogComponent>) {
      productApi.movieData$.subscribe(data => console.log(data));
  }

  ngOnInit() {
    // Subscribe to movieData$ from Product API Service
    this.productApi.movieData$.subscribe(movieData => {
      // Set autoCompleteOptions to movie data result
      this.autoCompleteOptions = movieData;
    });

    // Set up form control group
    this.itemForm = this.fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      userDescription: new FormControl('')
    })

    // Subscribe to changes on title FormControl
    this.itemForm.get('title').valueChanges.subscribe(title => 
      {
        // Get movie data from service
         this.productApi.fetchMovieData(title);
      })

  }
  // TODO Add default group
  onSubmitItem(title: string, category: Category, userDescription: string) {    
    let newItem = new Item(title, category, "", userDescription)
    this.groupService.addItemToCurrentGroup(newItem)
  }


}
