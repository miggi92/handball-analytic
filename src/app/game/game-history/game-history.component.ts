import { Player } from './../../player/models/player.model';
import { EventType } from './../models/statistic.model';
import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import {
  faBasketball,
  faQuestion,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss'],
})
export class GameHistoryComponent implements OnInit {
  @Input() game: Game;
  customIcons = {
    goal: faBasketball,
    missed: faXmark,
    unknown: faQuestion,
  };
  players: Player[];
  displayedColumns: string[] = ['date', 'event', 'team', 'player'];
  constructor() {
    this.players = new Array<Player>();
  }

  ngOnInit(): void {}

  convertEvent2Icon(eventType) {
    let icon;
    switch (eventType) {
      case EventType.goal:
        icon = this.customIcons.goal;
        break;
      case EventType.missed:
        icon = this.customIcons.missed;
        break;

      default:
        icon = this.customIcons.unknown;
        break;
    }
    return icon;
  }
  displayPlayerInfo(playerId) {
    this.initPlayers();
    let player: Player = this.players.find(
      (element) => element.id === playerId
    );
    if (player) {
      if (!player.number) {
        return `${player.firstName} ${player.name}`;
      }
      return `${player.number} - ${player.firstName} ${player.name}`;
    } else {
      return playerId;
    }
  }

  initPlayers() {
    if (this.game.players && this.players.length === 0) {
      if (
        this.game.players.home &&
        this.game.players.home[this.game.players.home.length - 1].name
      ) {
        this.players = this.players.concat(this.game.players.home);
      }
      if (
        this.game.players.away &&
        this.game.players.away[this.game.players.away.length - 1].name
      ) {
        this.players = this.players.concat(this.game.players.away);
      }
    }
  }
}
