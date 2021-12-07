import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GameCreateDialogComponent } from '../dialogs/game-create-dialog.component';
import { Game } from '../models/game.model';
import { GameDatabaseService } from '../services/game-database.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'opponent', 'actionsColumn'];
  games: Game[] = [];
  sub: Subscription = new Subscription;

  constructor(private gameDB: GameDatabaseService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.gameDB
      .getClubGames()
      .subscribe(games => this.games = games);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openGameDialog (){
    const dialogRef = this.dialog.open(GameCreateDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameDB.createGame(result);
      }
    });
  }

  deleteGame(element){

  }

}
