import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable of the user document from Firestore
  user$: Observable<any>;


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
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    const credentials = await this._afAuth.auth.createUserWithEmailAndPassword(email, password);
    
    // Create a document for the user in firestore with document-ID == uid
    const user = credentials.user
    const data = {uid: user.uid, email: user.email}
    this._afs.collection('users').doc(user.uid).set(data);
    
    // After successful registration, redirect the user to his main-view
    this.updateUserData(user);
  }

  async sendEmailVerification() {
    await this._afAuth.auth.currentUser.sendEmailVerification()
  }
  
  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._afAuth.auth.signInWithPopup(provider);
    const user = credential.user;

    // How to we catch first-time signIns? Such that we can create a
    // user-document with the respective userId in Firestore?
    this._afs.doc('users/${user.uid}').get().subscribe(doc => {
      if (doc.exists) {
        this.updateUserData(user);
      } else {
        // Create a document for the (new) user in firestore with document-ID == uid
        const data = { uid: user.uid, email: user.email }
        this._afs.collection('users').doc(user.uid).set(data);
        this.updateUserData(user);
      }
    })

  }

  async signOut() {
    await this._afAuth.auth.signOut();
    // localStorage.removeItem('user');
    // this.router.navigate('home')
  }

  /** Load data that is needed for the logged-in user's start-up view */
  private updateUserData(user) {
    console.log("Logged-in user:", user)
    const userRef = this._afs.doc('users/{user.uid}')
    this.userService.setupUser(user.uid)
    this.router.navigate(['main'])
  }
}
