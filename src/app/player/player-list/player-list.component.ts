import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/player/models/player.model';
import { Team } from 'src/app/team/models/team.model';
import { TeamDatabaseService } from 'src/app/team/services/team-database.service';
import { PlayerCreateDialogComponent } from '../dialogs/player-create-dialog.component';
import { PlayerDatabaseService } from '../services/player-database.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  team: Team;
  teamID;
  displayedColumns: string[] = ['isKeeper', 'name', 'firstName'];
  players: Player[] = [];

  subTeam: Subscription = new Subscription();
  subPlayer: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private teamDB: TeamDatabaseService,
    private playerDB: PlayerDatabaseService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.teamID = params['teamId'];
    });
  }

  ngOnInit(): void {
    this.subTeam = this.teamDB
      .getTeam(this.teamID)
      .subscribe((team) => (this.team = team));
    this.subPlayer = this.playerDB
      .getPlayers(this.teamID)
      .subscribe((players) => (this.players = players));
  }

  ngOnDestroy() {
    this.subTeam.unsubscribe();
    this.subPlayer.unsubscribe();
  }

  openPlayerCreationDialog() {
    const dialogRef = this.dialog.open(PlayerCreateDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.playerDB.createPlayer(this.teamID, result);
      }
    });
  }
}
