import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultServiceService } from 'src/app/services/default-service.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerDatabaseService extends DefaultServiceService {
  override _collection = 'players';
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
}
