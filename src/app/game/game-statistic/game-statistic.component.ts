import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/player/models/player.model';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent implements OnInit {
  @Input() game: Game;
  players: Player[];
  displayedColumns: string[] = ['player', 'goals', 'missed', 'hpi'];
  constructor() {
    this.players = new Array<Player>();
  }

  ngOnInit(): void {}

  displayPlayerInfo(playerId) {
    this.initPlayers();
    let player: Player = this.players.find(
      (element) => element.id === playerId
    );
    if (player) {
      return `${player.number} - ${player.firstName} ${player.name}`;
    } else {
      return playerId;
    }
  }

  initPlayers() {
    if (this.game.players && this.players.length === 0) {
      if (this.game.players.home && this.game.players.home[0].name) {
        this.players = this.players.concat(this.game.players.home);
      }
      if (this.game.players.away && this.game.players.away[0].name) {
        this.players = this.players.concat(this.game.players.away);
      }
    }
  }
}
