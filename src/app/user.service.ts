import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';
import { Group } from './group.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Why is the user an observable anyway? How does he "change over time"?^
  // --> I guess because the user may log-out and log-in again 
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  currentGroup$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);
  private _uid: string;

  constructor(private _afb: AngularFirestore) { 
  }

  setupUser(uid: string): void {
    this._uid = uid

    // Retrieve data from user's firebase-user-document
    this._afb.collection('users').doc(uid)
      .valueChanges()
      .subscribe(({email, uid}) => {
        console.log(email, uid)
        let user = new User (uid, email);
        this.user$.next(user);
      })

    // Retrieve items for main-page (infinite scroll?)
  }

  addGroup(group: Group) {
    // Deconstruct group-object s.t. it can be saved as document data
    const newGroup = {
      name: group.getName()
    }
    this._afb.collection('users').doc(this._uid).collection('groups').add(newGroup)
  }

  addItem(item: Item) {
    // Deconstruct Item-object s.t. it can be saved as document data
    const newItem = {
      title: item.getTitle(),
      category: item.getCategory(),
      imgUrl: item.getImageUrl(),
      userDescription: item.getUserDescription()
    }
    this._afb.collection('users/${this._uid}/items').add(newItem); 
  }
}
