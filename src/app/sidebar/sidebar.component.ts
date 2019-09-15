import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { UserService } from '../user.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  groups: Group[];

  constructor(private userService: UserService) { 
    this.userService.groups$.subscribe(groups => {
      this.groups = groups;
    });
  }
  
  ngOnInit() {
  }

}
