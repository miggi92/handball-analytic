import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, map, reduce, switchMap } from 'rxjs';
import { Team } from 'src/app/team/models/team.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root',
})
export class ClubDatabaseService {
  _collection: string = 'clubs';
  _userReference;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this._getUserRef();
  }
  async _getUserRef() {
    const user = await this.auth.getUser();
    this._userReference = this.db.collection('users').doc(user.uid).ref;
  }

  getClubs() {
    return this.db.collection(this._collection);
  }

  getUserClubs() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Club>(this._collection, (ref) =>
              ref.where('owner', '==', this._userReference).orderBy('name')
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          return [];
        }
      }),
      map((clubData) => {
        clubData.forEach((element) => {
          this.getUserData(element);
          return element;
        });
        return clubData;
      })
    );
  }

  private getUserData(element: any) {
    this.db
      .doc(element.owner)
      .get()
      .subscribe((owner) => {
        element.owner = owner.data();
      });
  }

  getClub(clubID: string) {
    return this.db
      .collection(this._collection)
      .doc(clubID)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((club) => {
          this.getUserData(club);
          return club;
        })
      );
  }

  async updateClub(clubId, data: Club) {
    return this.db.collection(this._collection).doc(clubId).update(data);
  }

  async createClub(data: Club) {
    const user = await this.auth.getUser();
    return this.db.collection(this._collection).add({
      ...data,
      owner: this._userReference,
    });
  }

  deleteClub(clubId: string) {
    return this.db.collection(this._collection).doc(clubId).delete();
  }

  async createTeam(clubId, data: Team) {
    return this.db
      .collection('teams')
      .add({
        ...data,
        club: this.db.collection(this._collection).doc(clubId).ref,
        createdBy: this._userReference,
      })
      .then((team) => {
        this.updateClub(clubId, {
          teams: [this.db.collection('teams').doc(team.id).ref],
        });
      });
  }
}
