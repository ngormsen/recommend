import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  selectedGroup: Group;

  constructor(private groupService: GroupService) {
    this.groupService.changeSelectedGroup$.subscribe(group => this.selectedGroup = group)
  }

  ngOnInit() {
  }

}
