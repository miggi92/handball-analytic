import { HistoryEntry } from './../models/history.model';
import {
  Statistic,
  calcStatistic,
  EventType,
} from './../models/statistic.model';
import { Player } from './../../player/models/player.model';
import { Game } from './../models/game.model';
import { Component, Input, OnInit } from '@angular/core';
import { SnackService } from 'app/services/snack.service';
import { MatDialog } from '@angular/material/dialog';
import { PickPlayerDialogComponent } from '../dialogs/pick-player-dialog.component';
import { GameDatabaseService } from '../services/game-database.service';

@Component({
  selector: 'app-game-observation',
  templateUrl: './game-observation.component.html',
  styleUrls: ['./game-observation.component.scss'],
})
export class GameObservationComponent implements OnInit {
  @Input() game: Game;
  displayedColumns: string[] = ['number', 'name', 'actionsColumn'];
  historyEntry: HistoryEntry;
  eventType: EventType;

  constructor(
    private snackBar: SnackService,
    private gameDB: GameDatabaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onClickEvent(eventType) {
    if (!this.game.statistics) {
      this.game.statistics = {
        home: new Array<Statistic>(),
        away: new Array<Statistic>(),
        history: new Array<HistoryEntry>(),
        activeKeeper: {
          home: '',
          away: '',
        },
      };
    }
    if (Object.values(EventType).includes(eventType)) {
      this.eventType = eventType;
      this.openPickPlayerDialog();
    } else {
      this.snackBar.error(`Event "${eventType}" not implemented yet!`);
    }
  }
  openPickPlayerDialog() {
    const dialogRef = this.dialog.open(PickPlayerDialogComponent, {
      width: 'auto',
      data: {
        homePlayers: this.game.players.home,
        awayPlayers: this.game.players.away,
        event: this.eventType,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let calcStats = new calcStatistic(
          result.data.player,
          result.data.team,
          this.eventType,
          this.game,
          this.gameDB
        );
        calcStats.process();
      }
    });
  }
  getPlayerFromID(playerId): Player {
    let players = this.getAllPlayers();
    if (!players) {
      return null;
    }
    let player: Player = players.find((element) => element.id === playerId);
    return player;
  }

  getAllPlayers() {
    let players = new Array<Player>();
    if (this.game.players) {
      if (this.game.players.home && this.game.players.home[0].name) {
        players = players.concat(this.game.players.home);
      }
      if (this.game.players.away && this.game.players.away[0].name) {
        players = players.concat(this.game.players.away);
      }
    }
    return players;
  }
}
