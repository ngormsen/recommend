import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Item, Category } from '../item.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private groupService: GroupService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateItemDialogComponent>) {
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      userDescription: new FormControl('')
    })

    // this.itemForm.valueChanges.subscribe(console.log)
  }
  // TODO Add default group
  onAddItemToCurrentGroup(title: string, category: Category, userDescription: string) {    
    let newItem = new Item(title, category, "", userDescription)
    this.groupService.addItemToCurrentGroup(newItem)
  }
}
