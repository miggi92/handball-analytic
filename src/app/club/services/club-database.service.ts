import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, switchMap } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})

export class ClubDatabaseService {
  _collection: string = "clubs";

  constructor(private auth: AuthService, private db: AngularFirestore) { }

  getClubs(){
    return this.db.collection(this._collection);
  }

  getUserClubs(){
    return this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Club>(this._collection, ref =>
              ref.where('owner', '==', user.uid).orderBy('name')
            )
            .valueChanges();
        } else {
          return [];
        }
      })
    );
  }

  async createClub(data: Club){
    const user = await this.auth.getUser();
    return this.db.collection(this._collection).add({
      ...data,
      owner: user.uid
    });
  }
}
