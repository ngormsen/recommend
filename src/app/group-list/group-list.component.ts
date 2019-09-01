import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { GROUPS } from '../MOCKDATA';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  currentGroup: Group;
  
  constructor(private groupService: GroupService) {
    this.groupService.groups.subscribe((groups) => { 
      return this.groups = groups;
    })
    
    this.groupService.currentGroup.subscribe((newGroup) => {
      this.currentGroup = newGroup;
    })
  }
  
  ngOnInit(): void {
  }

  onSetCurrentGroup(group: Group) {
    this.groupService.setCurrentGroup(group);
  }

}
