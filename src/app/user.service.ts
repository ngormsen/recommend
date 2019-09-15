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

export class UserService {
  isAppStart = true;
  
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>(null);
  currGroup$: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);
  currItems$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);
  
  constructor(private _afb: AngularFirestore) {
    // At each change of the current group, we retrieve its items
    // from the data base. That is exactly why current group
    // must be an observable -- we have to trigger something when 
    // current group changes. 
    this.currGroup$.subscribe(currGroup => {
      if (!this.isAppStart) { // <--- TODO: Look for more elegant solution.
        const currGroupId = currGroup.getGroupId();
        const itemsRef = this._afb.collection('items').ref;
  
        itemsRef.where('groupId', '==', currGroupId).get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log("No matching documents");
              return;
            }
            
            const items = snapshot.docs.map(doc => {
              const {title, category, userDescription} = doc.data();
              return new Item (title, category, "imageUrl", userDescription);
            })

            this.currItems$.next(items);
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
        const newUser = new User ("defaultName", uid, email);
        this.user$.next(newUser);
      })
    
    // Retrieve the user's subcollection 'groups' to display group-list
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
        const groups = changes.map(({id, name, isPrivate}) => {
          return new Group (id, name, isPrivate);
        });

        this.groups$.next(groups);

        if (this.isAppStart === true) {
          this.currGroup$.next(groups[0]);
          this.isAppStart = false;
          console.log('currentGroup:', this.currGroup$.value)
        };
      })
  } 

  setCurrentGroup(group: Group) {
    this.currGroup$.next(group);
  }

  addGroup(groupName: string, isPrivate: boolean) {
    const groupId = this._afb.createId();
    const currUserId = this.user$.value.getUserId();
    
    const data = {
      groupId: groupId,
      name: groupName,
      isPrivate: isPrivate
    };

    this._afb.collection('users').doc(currUserId).collection('groups').doc(groupId).set(data);
  }

  addItem(item: Item) {
    // Deconstruct Item-object s.t. it can be   saved as document data
    const newItem = {
      title: item.getTitle(),
      category: item.getCategory(),
      imgUrl: item.getImageUrl(),
      userDescription: item.getUserDescription()
    };
    
    const currUserId = this.user$.value.getUserId();
    this._afb.collection(`users/${currUserId}/items`).add(newItem);
  }

  addItemToCurrGroup(title: string, category: string, userDescription: string): void {
    // get current group's groupId.
    // save the item with the corresponding groupId as an attribute.
    const currGroupId = this.currGroup$.value.getGroupId();
    const itemData = {
      groupId: currGroupId,
      title: title,
      category: category,
      userDescription: userDescription
    };

    this._afb.collection('items')
      .add(itemData)
      .then(ref => {
        console.log('Added item-document with ID:', ref.id);
      })
  }
}
