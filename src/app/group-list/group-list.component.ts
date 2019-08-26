import { Component, OnInit } from '@angular/core';
import {Group} from '../group.model';
import { Item } from '../item.model';
import { GROUPS } from '../MOCKDATA';
import { GroupService } from '../group.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups : Group[];
  selectedGroup : Group;
  itemsOfSelectedGroup : Item[] = [];

  constructor(private groupService: GroupService) {
 }

  ngOnInit() {
    this.groups = GROUPS;

    if (!this.selectedGroup) {
      this.groupService.changeSelectedGroup(this.groups[0])
    }
  }

  onSelectGroup(group : Group){
    console.log(group);
    this.selectedGroup = group;
    this.groupService.changeSelectedGroup(group);
  }

}
