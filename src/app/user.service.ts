import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item.model';
import { Group } from './group.model';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})

// Fragen
// * Muss der Observable eine Variable sein?

export class UserService {
  private _uid: string;

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  items$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);
  currentGroup$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);
  isAppStart = true;
  
  constructor(private _afb: AngularFirestore) {
    this.user$.subscribe(x => {
      console.log("user$: ", x)
    })

    this.groups$.subscribe(x => {
      console.log("groups$: ", x)
    })

    this.currentGroup$.subscribe(x => {
      console.log("currentGroup$: ", x)
    })
  }
  
  setupUser(uid: string): void {
    this._uid = uid;
    
    // Retrieve data from user's firebase-user-document
    this._afb.collection('users').doc(uid)
      .valueChanges()
      .subscribe(({email, uid}) => {

        // Add user observable
        let user = new User ("defaultName", uid, email);
        this.user$.next(user);
        console.log("value change trigger", email, uid)
        // this.groups$.next(user)
        
      })

      this._afb.collection('users').doc(uid).collection('groups')
        .valueChanges()
        .subscribe(groups => {
          let groupObjects = groups.map(({name}) => {
            return new Group (name);
          })

          this.groups$.next(groupObjects);

          if (this.isAppStart === true) {
            this.currentGroup$.next(groupObjects[0])
            this.isAppStart = false;
          }
        })
  } 

  addGroup(group: Group) {
    this.currentGroup$.next(group);
    
    // Deconstruct group-object s.t. it can be saved as document data
    const newGroup = {
      name: group.getName()
    }
    
    
    // Add group to firebase
    this._afb.collection('users').doc(this._uid).collection('groups').add(newGroup)

    // Update groups$ s.t. the new group is displayed in the sidepanel
    console.log("new groups array: ", this.groups$.value.push(group))
  }

  addItem(item: Item) {
    // Deconstruct Item-object s.t. it can be   saved as document data
    const newItem = {
      title: item.getTitle(),
      category: item.getCategory(),
      imgUrl: item.getImageUrl(),
      userDescription: item.getUserDescription()
    }
    this._afb.collection(`users/${this._uid}/items`).add(newItem); 
  }
}
