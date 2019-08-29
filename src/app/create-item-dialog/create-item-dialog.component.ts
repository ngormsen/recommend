import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from '../item.model';
import { Group } from '../group.model';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<CreateItemDialogComponent>) {

  }
  ngOnInit() {
  }
  
  onCreateItem(title: string): void {
    let newItem = new Item(title);
  }

}
