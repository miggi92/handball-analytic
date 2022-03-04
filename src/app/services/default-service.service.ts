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
    this.init();
  }

  protected init() {
    // can be redefined
    return;
  }

  async _getUserRef() {
    const user = await this.auth.getUser();
    this._userReference = this.db.collection('users').doc(user.uid).ref;
  }

  protected populateClubData(element: any) {
    this.populateUserData(element);
    this.populateTeamsData(element);
    return element;
  }

  protected populateUserData(element: any) {
    this.db
      .doc(element.owner)
      .get()
      .subscribe((owner) => {
        element.owner = owner.data();
      });
  }
  protected populateTeamsData(club: any) {
    if (!club.teams || !Array.isArray(club.teams)) {
      return;
    }
    club.teams.forEach((team, index) => {
      this.db
        .doc(team.path)
        .get()
        .subscribe((snapshot) => {
          club.teams[index] = snapshot.data();
          club.teams[index].id = snapshot.id;
        });
    });
  }
}
