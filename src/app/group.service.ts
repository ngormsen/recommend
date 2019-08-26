import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { GROUPS } from './MOCKDATA';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  changeSelectedGroup$: Observable<any>;
  selectedGroupSubject = new Subject<any>();

  constructor() { 
    this.changeSelectedGroup$ = this.selectedGroupSubject.asObservable();
  }

  changeSelectedGroup(group: Group) {
    this.selectedGroupSubject.next(group);
  }

}
