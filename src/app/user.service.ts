import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item.model';
import { Group } from './group.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Fragen
// * Muss der Observable eine Variable sein?

export class UserService {
  
  user: User;
  groups: Group[];
  currGroup$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);
  currItems: Item[];
  isAppStart = true;
  
  constructor(private _afb: AngularFirestore) {
    this.currGroup$.subscribe(currGroup => {
      if (!this.isAppStart) {
        // I have to get the groupId and then
        // retrieve items that correspond to this group id
        const currGroupId = currGroup.getGroupId();
        const itemsRef = this._afb.collection('items').ref;
  
        itemsRef.where('groupId', '==', currGroupId).get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log("No matching documents");
              return;
            }
  
            snapshot.forEach(doc => {
              console.log(doc.id, '=>', doc.data());
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
    })
  }
  
  setupUser(uid: string): void {
    // Retrieve user data from user's firebase-user-document
    this._afb.collection('users').doc(uid)
      .valueChanges()
      .subscribe(({email, uid}) => {
        this.user = new User ("defaultName", uid, email);
      })
    
    // // Retrieve the user's subcollection 'groups' to display group-list
    this._afb.collection('users').doc(uid).collection('groups')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(change => {
            const data = change.payload.doc.data();
            const id = change.payload.doc.id;
            return {id, ...data};
          })
        })
      )
      .subscribe(changes => {
        this.groups = changes.map(({id, name}) => {
          return new Group (id, name);
        })
        console.log(this.groups);

        if (this.isAppStart === true) {
          this.currGroup$.next(this.groups[0]);
          this.isAppStart = false;
        };
        console.log('currentGroup:', this.currGroup$.value)
      })
  } 

  addGroup(group: Group) {
    this.currGroup$.next(group);
    
    // Deconstruct group-object s.t. it can be saved as document data
    const newGroup = {
      name: group.getName()
    }
    
    // Add group to firebase
    this._afb.collection('users').doc(this.user.getUserId()).collection('groups').add(newGroup)
  }

  addItem(item: Item) {
    // Deconstruct Item-object s.t. it can be   saved as document data
    const newItem = {
      title: item.getTitle(),
      category: item.getCategory(),
      imgUrl: item.getImageUrl(),
      userDescription: item.getUserDescription()
    };

    this._afb.collection(`users/${this.user.getUserId()}/items`).add(newItem);
  }
}
