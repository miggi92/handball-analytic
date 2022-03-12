import { Injectable } from '@angular/core';
import { arrayUnion } from 'firebase/firestore';
import { map } from 'rxjs';
import { ClubDatabaseService } from 'src/app/club/services/club-database.service';
import { DefaultServiceService } from 'src/app/services/default-service.service';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamDatabaseService extends DefaultServiceService {
  override _collection = 'teams';
  private clubDB: ClubDatabaseService;
  private static _instance: TeamDatabaseService;

  public static getInstance(auth, db): TeamDatabaseService {
    if (!this._instance) {
      this._instance = new TeamDatabaseService(auth, db);
    }
    return this._instance;
  }

  getTeams() {
    return this.db.collection(this._collection);
  }

  getTeam(teamID: string) {
    return this.db
      .collection(this._collection)
      .doc(teamID)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((team) => {
          this.populateTeamsData(team);
          return team;
        })
      );
  }

  async createTeam(clubId, data: Team) {
    this.clubDB = ClubDatabaseService.getInstance(this.auth, this.db);
    return this.db
      .collection(this._collection)
      .add({
        ...data,
        club: this.db.collection(this.clubDB._collection).doc(clubId).ref,
        createdBy: this._userReference,
      })
      .then((team) => {
        this.clubDB.updateClub(clubId, {
          teams: arrayUnion(this.db.collection('teams').doc(team.id).ref),
        });
      });
  }
}