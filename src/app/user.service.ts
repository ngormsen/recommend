import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private _afb: AngularFirestore) { 
  }

  setupUser(uid: string): void {
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
}
