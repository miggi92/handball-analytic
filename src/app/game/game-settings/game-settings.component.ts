import { GameDatabaseService } from './../services/game-database.service';
import { PlayerDatabaseService } from './../../player/services/player-database.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PickPlayerDialogComponent } from '../dialogs/pick-player-dialog.component';
import { Game } from '../models/game.model';
import { Player } from 'app/player/models/player.model';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit {
  @Input() game: Game;
  homeTeamPlayers: Player[];
  awayTeamPlayers: Player[];

  constructor(
    public dialog: MatDialog,
    private playerDB: PlayerDatabaseService,
    private gameDB: GameDatabaseService
  ) {}

  ngOnInit(): void {
    if (this.game.teams) {
      if (this.game.teams.home) {
        this.game.teams.home
          .get()
          .then((teamDoc) =>
            this.playerDB
              .getPlayers(teamDoc.id)
              .subscribe((players) => (this.homeTeamPlayers = players))
          );
      }
      if (this.game.teams.away) {
        this.game.teams.away
          .get()
          .then((teamDoc) =>
            this.playerDB
              .getPlayers(teamDoc.id)
              .subscribe((players) => (this.awayTeamPlayers = players))
          );
      }
    }
  }

  addPlayer() {
    let homePlayers;
    let awayPlayers;
    if (this.homeTeamPlayers) {
      homePlayers = this.homeTeamPlayers;
      homePlayers = homePlayers.filter((item) => {
        if (
          this.game.players.home?.filter((e) => e.id === item.id).length > 0
        ) {
          return false;
        }
        return true;
      });
    }
    if (this.awayTeamPlayers) {
      awayPlayers = this.awayTeamPlayers;
      awayPlayers = awayPlayers.filter((item) => {
        if (
          this.game.players.away?.filter((e) => e.id === item.id).length > 0
        ) {
          return false;
        }
        return true;
      });
    }
    const dialogRef = this.dialog.open(PickPlayerDialogComponent, {
      width: 'auto',
      data: {
        homePlayers: homePlayers,
        awayPlayers: awayPlayers,
        event: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameDB.addPlayer2Team(
          this.game.id,
          result.data.team,
          result.data.player
        );
      }
    });
  }
}
