import { Injectable } from '@angular/core';
import { DefaultServiceService } from 'src/app/services/default-service.service';

@Injectable({
  providedIn: 'root',
})
export class TeamDatabaseService extends DefaultServiceService {
  override _collection = 'teams';

  getTeams() {
    return this.db.collection(this._collection);
  }
}
