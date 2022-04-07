import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { DefaultServiceService } from 'src/app/services/default-service.service';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameDatabaseService extends DefaultServiceService {
  override _collection: string = 'games';

  getGames() {
    return this.db.collection(this._collection).valueChanges({ idField: 'id' });
  }

  getGame(gameId) {
    return this.db
      .collection(this._collection)
      .doc(gameId)
      .valueChanges({ idField: 'id' });
  }

  getClubGames() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Game>(this._collection, (ref) =>
              ref
                .where(
                  'clubId',
                  '==',
                  this.db.collection('clubs').doc(this._userData.activeClub).ref
                )
                .orderBy('date')
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          return [];
        }
      })
    );
  }

  getUserGames() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Game>(this._collection, (ref) =>
              ref.where('created.by', '==', this._userReference).orderBy('name')
            )
            .valueChanges({
              idField: 'id',
            });
        } else {
          return [];
        }
      })
    );
  }

  async createGame(data: Game) {
    const user = await this.auth.getUser();
    return this.db.collection(this._collection).add({
      ...data,
      clubId: this.db.collection('clubs').doc(user.activeClub).ref,
      created: {
        by: this._userReference,
        at: Date.now(),
      },
    });
  }

  deleteGame(gameId: string) {
    return this.db.collection(this._collection).doc(gameId).delete();
  }
}
