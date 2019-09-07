import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { Item } from '../item.model';
import { CATEGORIES } from '../MOCKDATA';
import { AmazonService } from '../amazon.service';
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  currentGroup: Group;
  categories: string[];

  constructor(private groupSvc: GroupService) {
    this.categories = CATEGORIES;
  }

  ngOnInit() {
    this.groupSvc.currentGroup$.subscribe(group => {
      this.currentGroup = group;
    })
  }

  onAddItemToCurrentGroup() {
    this.groupSvc.addItemToCurrentGroup(new Item("TEST ITEM", "movie"))
  }

}
