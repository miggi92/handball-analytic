import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameDatabaseService {
  _collection: string = "games";

  constructor(private auth: AuthService, private db: AngularFirestore) {
  }

  getGames(){
    return this.db.collection(this._collection).valueChanges({idField: 'id'});
  }

  getClubGames(clubID?: string){
    if(!clubID){
      clubID = '5092CgL9OaI6r9NH0pLZ';
    }

    return this.db
      .collection<Game>(this._collection, ref => ref.where('clubId', '==', clubID))
      .valueChanges({
        idField: 'id'
      });
  }

  getUserGames(){
    return this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Game>(this._collection, ref =>
              ref.where('created.by', '==', user.uid).orderBy('name')
            )
            .valueChanges({
              idField: 'id'
            });
        } else {
          return [];
        }
      })
    );
  }

  async createGame(data: Game){
    const user = await this.auth.getUser();
    return this.db.collection(this._collection).add({
      ...data,
      clubId: user.activeClub,
      created: {
        by: user.uid,
        at: Date.now()
      }
    });
  }

  deleteGame(gameId: string){
    return this.db
      .collection(this._collection)
      .doc(gameId)
      .delete();
  }
}
