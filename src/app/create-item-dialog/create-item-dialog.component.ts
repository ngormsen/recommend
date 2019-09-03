import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateItemDialogComponent>) {
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      category: new FormControl(''),
      title: new FormControl(''),
      message: new FormControl('')
    })

    this.itemForm.valueChanges.subscribe(console.log)
  }
  
}
