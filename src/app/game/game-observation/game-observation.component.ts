import { Statistic } from './../models/statistic.model';
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
  selectedPlayer: Player;
  selectedTeam;
  eventType;
  activeGoalkeeper: { home: Player; away: Player };

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
      };
    }
    switch (eventType) {
      case 'goal':
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
        this.selectedPlayer = result.data.player;
        this.selectedTeam = result.data.team;
        this.processStatistic();
      }
    });
  }
  processStatistic() {
    switch (this.eventType) {
      case 'goal':
        if (this.selectedPlayer) {
          var team = this.game.statistics[this.selectedTeam];
          const found: Statistic = team.find(
            (element) => element.playerId === this.selectedPlayer.id
          );
          if (found) {
            let index = team.indexOf(found);
            found.goals++;
            team[index] = found;
          } else {
            var stats: Statistic = {
              playerId: this.selectedPlayer.id,
              goals: 1,
            };
            team.push(stats);
          }
          this.game.statistics[this.selectedTeam] = team;
          this.gameDB.updateStatistics(this.game.id, this.game.statistics);
        }
        break;

      default:
        break;
    }
  }
}
