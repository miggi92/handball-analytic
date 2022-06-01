import { Injectable } from '@angular/core';
import { arrayUnion } from 'firebase/firestore';
import { map, switchMap } from 'rxjs';
import { DefaultServiceService } from 'app/services/default-service.service';
import { Team } from 'app/team/models/team.model';
import { TeamDatabaseService } from 'app/team/services/team-database.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root',
})
export class ClubDatabaseService extends DefaultServiceService {
  override _collection = 'clubs';
  private teamDB: TeamDatabaseService;
  private static _instance: ClubDatabaseService;

  public static getInstance(auth, db): ClubDatabaseService {
    if (!this._instance) {
      this._instance = new ClubDatabaseService(auth, db);
    }
    return this._instance;
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
          this.populateClubData(element);
          return element;
        });
        return clubData;
      })
    );
  }

  getClub(clubID: string) {
    return this.db
      .collection(this._collection)
      .doc(clubID)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((club) => {
          this.populateClubData(club);
          return club;
        })
      );
  }

  async updateClub(clubId, data: any) {
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
    this.teamDB = TeamDatabaseService.getInstance(this.auth, this.db);
    return this.teamDB.createTeam(clubId, data);
  }
}
