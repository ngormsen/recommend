import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  user: User;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.user$.subscribe(user => {
      this.user = user;
    })
  }

}
