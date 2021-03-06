import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  items: Item[];

  constructor(private _userService: UserService) {
  }
  
  ngOnInit() {
    this._userService.currItems$.subscribe(items => this.items = items);
  }

}
