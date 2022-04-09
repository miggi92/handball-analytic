import { HistoryEntry } from './../models/history.model';
import {
  Statistic,
  calcStatistic,
  EventType,
} from './../models/statistic.model';
import { Player } from './../../player/models/player.model';
import { Game } from './../models/game.model';
import { Component, Input, OnInit } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';
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
  activeGoalkeeper: { home: Player; away: Player };
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
      };
    }
    switch (eventType) {
      case EventType.goal:
      case EventType.missed:
        this.eventType = eventType;
        this.openPickPlayerDialog();
        break;
      default:
        this.snackBar.error(`Event "${eventType}" not implemented yet!`);
        break;
    }
  }
  openPickPlayerDialog() {
    const dialogRef = this.dialog.open(PickPlayerDialogComponent, {
      width: 'auto',
      data: {
        game: this.game,
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
}
