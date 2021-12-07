import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { firstValueFrom, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor( private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
  }

  async getUser(): Promise<User>{
    return firstValueFrom(this.user$);
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  public async changeActiveClub(clubID: string){
    let user = await this.getUser();
    return this.afs.doc(`users/${user.uid}`).update({activeClub:clubID});
  }
}