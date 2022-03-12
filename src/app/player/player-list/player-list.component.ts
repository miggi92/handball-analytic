import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/game/models/player.model';
import { Team } from 'src/app/team/models/team.model';
import { TeamDatabaseService } from 'src/app/team/services/team-database.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  team: Team;
  teamID;
  displayedColumns: string[] = ['name', 'actionsColumn'];
  players: Player[];

  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private teamDB: TeamDatabaseService
  ) {
    this.route.params.subscribe((params) => {
      this.teamID = params['teamId'];
    });
  }

  ngOnInit(): void {
    this.sub = this.teamDB
      .getTeam(this.teamID)
      .subscribe((team) => (this.team = team));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
