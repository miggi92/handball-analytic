import { TeamDatabaseService } from './../../team/services/team-database.service';
import { Injectable } from '@angular/core';
import { arrayUnion } from 'firebase/firestore';
import { map, switchMap } from 'rxjs';
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
          this.sortStatistics(game);
          return game;
        })
      );
  }
  sortStatistics(game) {
    if (game['statistics'] && game['statistics']['history']) {
      game['statistics']['history'] = game['statistics']['history'].sort(
        (a: any, b: any) => {
          let bd = this.objToDate(b.date);
          let ad = this.objToDate(a.date);
          return +bd - +ad;
        }
      );
    }
  }
  objToDate(obj) {
    let result = new Date(0);
    result.setSeconds(obj.seconds);
    result.setMilliseconds(obj.nanoseconds / 1000000);
    return result;
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
        gameData.forEach((game) => {
          this.populateGame(game);
        });
        return gameData;
      })
    );
  }

  async createGame(data) {
    const user = await this.auth.getUser();
    let game = data;
    if (data.teams.home) {
      game.teams.home = this.db.collection('teams').doc(data.teams.home).ref;
    }
    // if (data.teams.away) {
    //   game.teams.away = this.db.collection('teams').doc(data.teams.away).ref;
    // }
    return this.db.collection(this._collection).add({
      ...game,
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

  async updateGame(gameId, data) {
    return this.db.collection(this._collection).doc(gameId).update(data);
  }

  async addPlayer2Team(gameId, team, player) {
    let id: string = 'players.' && team;
    return this.db
      .collection(this._collection)
      .doc(gameId)
      .set({
        [id]: arrayUnion(this.db.collection('players').doc(player.id).ref),
      });
  }

  async updateStatistics(gameId, data) {
    return this.db
      .collection(this._collection)
      .doc(gameId)
      .update({ statistics: data });
  }

  deleteGame(gameId: string) {
    return this.db.collection(this._collection).doc(gameId).delete();
  }
}
