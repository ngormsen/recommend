import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from '../item.model';
import { CreateItemDialogComponent } from '../create-item-dialog/create-item-dialog.component';
import { Group } from '../group.model';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {
  @Input() selectedGroup: Group;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void { 
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '500px'
    });

  dialogRef.afterClosed().subscribe(item => {
    this.selectedGroup.addItem(item)
  });
  }
};