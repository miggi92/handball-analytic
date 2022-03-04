import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../user/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultServiceService {
  _collection: string;
  _userReference;

  constructor(protected auth: AuthService, protected db: AngularFirestore) {
    this._getUserRef();
  }

  async _getUserRef() {
    const user = await this.auth.getUser();
    this._userReference = this.db.collection('users').doc(user.uid).ref;
  }
}
