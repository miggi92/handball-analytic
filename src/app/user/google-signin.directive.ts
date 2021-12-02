import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {

  constructor(private auth: AngularFireAuth) { }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  @HostListener('click')
  onclick() {
    this.login();
  }

}
