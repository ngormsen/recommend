import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Input() groups: Group[];
  testVar;

  constructor(private userService: UserService) {
    this.userService.groups$.subscribe(groups => {
      // was du damit machst ist beliebig
      this.testVar = groups;
    })
  }

  ngOnInit(): void {
  }

  onSetCurrentGroup() {
  }

}
