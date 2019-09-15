import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { Item } from '../item.model';
import { CATEGORIES } from '../MOCKDATA';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  @Input() items: Item[];
  categories: string[];

  constructor() {
    this.categories = CATEGORIES;
  }

  ngOnInit() {
  }

}
