import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Group } from './group.model';
import { GROUPS } from './MOCKDATA';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // A BehaviorSubject, other than Subject, _stores_ the last value that it
  // has emitted, such that potentially late subscribers can retrive 
  // the last emitted value (using myBehaviorSubject.value)
  groups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>(GROUPS);
  currentGroup: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);

  constructor() {
    // Set an initial group at app start
    if (this.groups.value) {
      this.setCurrentGroup(this.groups.value[0])
    }
  }
  
  setCurrentGroup(newGroup: Group) {
    this.currentGroup.next(newGroup);
  }

  addItemToCurrentGroup(item: Item) {
    // Note: Since currentGroup is a BehaviorSubject, we 
    // can access its last emitted value (a group). We then use this 
    // value to call the group's `addItem()` function.
    this.currentGroup.value.addItem(item);
  }
}
