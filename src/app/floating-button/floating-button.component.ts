import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateItemDialogComponent } from '../create-item-dialog/create-item-dialog.component';
import { Item } from '../item.model';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private groupService: GroupService) { 

  }

  ngOnInit() {
  }

  openDialog(): void { 
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '500px'
    });

    // Adding item to currentGroup works, but the form-input itself is buggy.
    dialogRef.afterClosed().subscribe(item => {
      this.groupService.addItemToCurrentGroup(item);
    });
  }
};