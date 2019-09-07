import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from '../group.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Input() groups: Group[];
  
  constructor(private groupSvc: GroupService) {

  }
  ngOnInit(): void {
  }

  onSetCurrentGroup(group) {
    console.log("Setting current group")
    this.groupSvc.setCurrentGroup(group);
  }

}
