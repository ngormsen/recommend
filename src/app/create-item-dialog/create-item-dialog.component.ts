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
  options: string[] = []

  constructor(
    private http: HttpClient,
    private groupService: GroupService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateItemDialogComponent>) {
  }

  private _changeOptions(options) : void{
    this.options = options
  }

  // TODO Create service for api calls
  private _retrieveMovieData(value){
    let options : string[] = [];
    this._url = `http://www.omdbapi.com/?apikey=b192c98a&s=${value}`
    this.http.get(this._url).subscribe(results =>{
      if(results['Response'] != "False"){
          for(let result in results['Search']){
            options.push(results['Search'][result].Title);
            
          }
          // TODO subscribe/return the value 
          this._changeOptions(options)
      }
    })  
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      userDescription: new FormControl('')
    })

    // Subscribe to changes on title FormControl
    this.itemForm.get('title').valueChanges.subscribe(value => 
      {
        this._retrieveMovieData(value);
      })

  }
  // TODO Add default group
  onSubmitItem(title: string, category: Category, userDescription: string) {    
    let newItem = new Item(title, category, "", userDescription)
    this.groupService.addItemToCurrentGroup(newItem)
  }


}
