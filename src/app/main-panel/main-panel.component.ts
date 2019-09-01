import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  currentGroup: Group;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    // Subscribe to currentGroup of GroupService, such that the currentGroup
    // attribute gets updated each time the value changes in the service.
    this.groupService.currentGroup.subscribe((newGroup) => {
      this.currentGroup = newGroup;
    })
  }

  onAddItemToCurrentGroup() {
    this.groupService.addItemToCurrentGroup(new Item("TEST ITEM"))
  }

}
