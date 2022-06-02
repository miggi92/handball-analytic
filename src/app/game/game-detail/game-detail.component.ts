import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../models/game.model';
import { GameDatabaseService } from '../services/game-database.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: Game;
  sub: Subscription = new Subscription();
  gameID: string;

  constructor(
    private gameDB: GameDatabaseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.gameID = params['gameId'];
    });
  }

  ngOnInit(): void {
    this.sub = this.gameDB.getGame(this.gameID).subscribe((game) => {
      this.game = game;
      console.log(this.game);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
