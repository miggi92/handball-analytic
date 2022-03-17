import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import firebase from 'firebase/compat';
import { mergeMap, mergeMapTo, Subject } from 'rxjs';
import { AuthService } from '../user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(private messaging: AngularFireMessaging) { }

  // get permission to send messages
  getPermission(user) {
    this.messaging.requestToken // getting tokens
      .subscribe(
        (token) => { // USER-REQUESTED-TOKEN
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  monitorRefresh(user){

  }

    // used to show message when app is open
    receiveMessages() {
      this.messaging.onMessage(payload => {
       console.log('Message received. ', payload);
       this.messageSource.next(payload)
     });

    }
}
