import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private _afb: AngularFirestore) {
  }

  setupUser(uid) {
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

  getUser() {
  }
}