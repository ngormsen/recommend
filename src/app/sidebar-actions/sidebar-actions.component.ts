import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { Item } from '../item.model';
import { MatDialog } from '@angular/material';
import { CreateItemDialogComponent } from '../create-item-dialog/create-item-dialog.component';
import { CreateNewGroupDialogComponent } from '../create-new-group-dialog/create-new-group-dialog.component';

@Component({
  selector: 'app-sidebar-actions',
  templateUrl: './sidebar-actions.component.html',
  styleUrls: ['./sidebar-actions.component.scss']
})
export class SidebarActionsComponent implements OnInit {
  currentGroup: Group;

  constructor(private groupService: GroupService, public dialog: MatDialog) {
    // Subscribe to currentGroup of GroupService, such that the currentGroup
    // attribute gets updated each time the value changes in the service.
    this.groupService.currentGroup$.subscribe((newGroup) => {
      this.currentGroup = newGroup;
    });
  }

  ngOnInit() {
  }

  onAddItemToCurrentGroup() {
    this.groupService.addItemToCurrentGroup(new Item("TEST ITEM", "movie"))
  }

  onAddItem() {
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '900px',
      height: '800px'
    });
  }

  onCreateNewGroup() {
    const dialogRef = this.dialog.open(CreateNewGroupDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh'
    });
  }

}
