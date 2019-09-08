import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$;
  private _user: User;
  private _uid: string;

  constructor(private _fb: AngularFirestore) { 
  }

  setupUser(userRef) {
    console.log(userRef)
    console.log(userRef.valueChanges())
    userRef.valueChanges().subscribe(console.log)
  }
}
