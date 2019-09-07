import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable of the user document from Firestore
  user$: Observable<User>;


  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._afs.doc('users/${user.uid}').valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    var credential = await this._afAuth.auth.signInWithEmailAndPassword(email, password);
    console.log("You've successfully logged in with email+pw!")
    this.updateUserData(credential.user);
    //this.router.navigate([...])
  }

  async emailAndPasswordRegister(email: string, password: string) {
    var result = await this._afAuth.auth.createUserWithEmailAndPassword(email, password);
    // this.sendEmailVerification()
  }

  async sendEmailVerification() {
    await this._afAuth.auth.currentUser.sendEmailVerification()
    //this.router.navigate([...])
  }
  
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.auth.signInWithPopup(provider);
    console.log("You've successfully logged in with email+pw!")
    this.updateUserData(credential.user);
    // this.router.navigate([...])
  }

  async signOut() {
    await this._afAuth.auth.signOut();
    // localStorage.removeItem('user');
    // this.router.navigate('home')
  }

  private updateUserData({ uid, email}) {
    // note: 'uid' must be a field of a single user's firestore document!
    const userRef: AngularFirestoreDocument<any> = this._afs.doc('users/${user.uid}');

    // Create data that we want to save
    const data = {
      uid: uid,
      email: email,
    }

    console.log(data)

    // {merge: true}: Only updates data that has changed in the data-payload.
    return userRef.set(data, { merge: true });
  }
}
