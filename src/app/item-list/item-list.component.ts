import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  @Input() currentCategory: string;

  constructor() {
  }

  ngOnInit() {
  }

}

