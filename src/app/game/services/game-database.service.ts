import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Player } from 'src/app/player/models/player.model';
import { DefaultServiceService } from 'src/app/services/default-service.service';
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
      .valueChanges({ idField: 'id' })
      .pipe(
        map((game) => {
          this.populateGame(game);
          return game;
        })
      );
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
      }),
      map((gameData) => {
        // console.log(gameData);
        return gameData;
      })
    );
  }

  async createGame(data: Game) {
    const user = await this.auth.getUser();
    return this.db.collection(this._collection).add({
      ...data,
      done: false,
      clubId: this.db.collection('clubs').doc(user.activeClub).ref,
      created: {
        by: this._userReference,
        at: Date.now(),
      },
    });
  }

  populateGame(game: Game) {
    if (game.players) {
      if (game.players.home) {
        game.players.home.forEach((homePlayer, index) => {
          let docRef;
          docRef = homePlayer;
          this.db
            .doc(docRef.path)
            .get()
            .subscribe((snapshot) => {
              game.players.home[index] = snapshot.data();
            });
        });
      }
      if (game.players.away) {
        game.players.away.forEach((opponentPlayer, index) => {
          let docRef;
          docRef = opponentPlayer;
          this.db
            .doc(docRef.path)
            .get()
            .subscribe((snapshot) => {
              game.players.away[index] = snapshot.data();
            });
        });
      }
    }
    return game;
  }

  private getPlayerData(player: Player) {
    let docRef;
    docRef = player;
    this.db
      .doc(docRef)
      .get()
      .subscribe((element) => {
        player = element.data();
      });
    return player;
  }

  deleteGame(gameId: string) {
    return this.db.collection(this._collection).doc(gameId).delete();
  }
}
