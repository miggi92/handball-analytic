import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faHands, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
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
  customIcons = {
    keeper: faHands,
    player: faPersonRunning,
  };

  team: Team;
  teamID;
  displayedColumns: string[] = ['active', 'isKeeper', 'name', 'actionsColumn'];
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
      width: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.playerDB.createPlayer(this.teamID, result);
      }
    });
  }

  changePlayerActive(player: Player, checkbox: MatCheckbox) {
    player.active = checkbox.checked;
    this.playerDB.updatePlayer(player);
  }
}
