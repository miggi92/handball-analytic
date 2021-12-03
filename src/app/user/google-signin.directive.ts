import { Directive, HostListener } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {

  constructor(private auth: AuthService) { }
  login() {
    this.auth.googleSignin();
  }
  logout() {
    this.auth.signOut();
  }

  @HostListener('click')
  onclick() {
    this.login();
  }

}
