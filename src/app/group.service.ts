import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Group } from './group.model';
import { Item } from './item.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupsMetadata: any[];
  private items;

  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>(null);
  currentGroup$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);

  constructor(private db: AngularFirestore) { 
    this.getGroups()
  }
  
  getGroups(): void {
    const dbGroupsRef = this.db.collection('groups')

    // Retrieve data of 'groups' collection from firebase. Since
    // it includes a subcollection, we use snapshotChanges() 
    dbGroupsRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;          
            return { groupId: id, ...data };
          })
        })
      )
      .subscribe(groupsMetadata => {
        this.groupsMetadata = groupsMetadata
    })


    
  }

  setCurrentGroup(newGroup: Group) {
    this.currentGroup$.next(newGroup);
  }

  addItemToCurrentGroup(item: Item) {
    this.currentGroup$.value.addItem(item);
  }
}
