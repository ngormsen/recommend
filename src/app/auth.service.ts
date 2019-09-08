import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable of the user document from Firestore
  user$: Observable<User>;


  constructor(
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private router: Router,
    private userService: UserService
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
    this.router.navigate(['main'])
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    var result = await this._afAuth.auth.createUserWithEmailAndPassword(email, password);
    // this.sendEmailVerification()
  }

  async sendEmailVerification() {
    await this._afAuth.auth.currentUser.sendEmailVerification()
  }
  
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.auth.signInWithPopup(provider);
    console.log("You've successfully logged in with email+pw!")
    this.updateUserData(credential.user);
    this.router.navigate(['main'])
  }

  async signOut() {
    await this._afAuth.auth.signOut();
    // localStorage.removeItem('user');
    // this.router.navigate('home')
  }

  /** Load data that is needed for the logged-in user's start-up view */
  private updateUserData(user) {
    // TODO: Change <any> to <User> 
    console.log("Logged-in user:", user)
    const userRef = this._afs.doc('users/{user.uid}')
    this.userService.setupUser(userRef)
  }
}
