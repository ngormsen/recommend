import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  groups: Group[];

  constructor(private groupSvc: GroupService) { 
    this.groupSvc.groups$.subscribe(console.log)
    this.groupSvc.groups$.subscribe(groups => {
      this.groups = groups;
    })
  }

  ngOnInit() {

    console.log("groups-sidebar:",this.groups)
  }

}
