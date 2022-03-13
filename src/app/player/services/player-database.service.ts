import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultServiceService } from 'src/app/services/default-service.service';
import { Player } from '../models/player.model';
import { TeamDatabaseService } from 'src/app/team/services/team-database.service';
import { arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PlayerDatabaseService extends DefaultServiceService {
  override _collection = 'players';
  private teamDB: TeamDatabaseService;

  getPlayers(teamID) {
    return this.db
      .collection<Player>(this._collection, (ref) =>
        ref
          .where('teamID', '==', this.db.collection('teams').doc(teamID).ref)
          .orderBy('name')
      )
      .valueChanges({
        idField: 'id',
      });
  }
  async createPlayer(teamID, data: Player) {
    return this.db
      .collection(this._collection)
      .add({
        ...data,
        teamID: this.db.collection('teams').doc(teamID).ref,
      })
      .then((player) => {
        this.initTeamDB();
        this.teamDB.updateTeam(teamID, {
          teams: arrayUnion(
            this.db.collection(this._collection).doc(player.id).ref
          ),
        });
      });
  }

  private initTeamDB() {
    this.teamDB = TeamDatabaseService.getInstance(this.auth, this.db);
  }

  async updatePlayer(data: Player) {
    return this.db.collection(this._collection).doc(data.id).update(data);
  }
}
