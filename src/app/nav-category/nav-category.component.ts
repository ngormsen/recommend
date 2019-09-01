import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../group.model';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.scss']
})
export class NavCategoryComponent implements OnInit {
  @Input() currentGroup: Group;

  constructor() { }

  ngOnInit() {
  }
  
  onSelectCategory(){
    // this.categoryService.setCurrentCategory()
    // console.log(category);
    console.log("hello")
  }

}
