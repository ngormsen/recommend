import { Component, OnInit, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { Item } from '../item.model';
import { GroupService } from '../group.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  itemList: Item[];

  constructor(private groupService: GroupService) {
    this.groupService.changeSelectedGroup$.subscribe(group => this.itemList = group.getItems())
  }

  ngOnInit() {
  }

}

