import { Game } from 'app/game/models/game.model';
import { TeamDatabaseService } from './../../team/services/team-database.service';
import { ClubDatabaseService } from './../../club/services/club-database.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GameCreateDialogComponent } from '../dialogs/game-create-dialog.component';
import { GameDatabaseService } from '../services/game-database.service';
import { Team } from 'app/team/models/team.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'opponent', 'actionsColumn'];
  games: Game[] = [];
  teams: Team[] = [];
  sub: Subscription = new Subscription();

  constructor(
    private gameDB: GameDatabaseService,
    public dialog: MatDialog,
    private teamDB: TeamDatabaseService
  ) {}

  ngOnInit(): void {
    this.sub = this.gameDB.getClubGames().subscribe((games) => {
      this.games = games;
    });
    this.teamDB.getTeams().subscribe((teams) => (this.teams = teams));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openGameDialog() {
    let game: Game = {};
    const dialogRef = this.dialog.open(GameCreateDialogComponent, {
      width: '400px',
      data: {
        game: game,
        teams: this.teams,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gameDB.createGame(result.game);
      }
    });
  }

  deleteGame(element) {}
}
