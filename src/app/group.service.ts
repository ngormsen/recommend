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

  // Action stream which accepts an item and adds it to the currentGroup
  addItem: Subject<Item> = new Subject<Item>();

  constructor() {
    // Set an initial group at app start
    if (this.groups.value) {
      this.setCurrentGroup(this.groups.value[0])
    }

    // configure the action stream `addItem`
    this.addItem  

  }
  
  setCurrentGroup(newGroup: Group) {
    this.currentGroup.next(newGroup);
  }

  addItemToCurrentGroup(item: Item) {
    console.log("Adding item to current group:", item)
    this.currentGroup.value.addItem(item);
  }
}
