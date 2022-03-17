import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamDatabaseService } from '../services/team-database.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actionsColumn'];
  teams: Team[];
  sub: Subscription = new Subscription();
  teamID;


  constructor(
    private teamDB: TeamDatabaseService
  ) {
  }

  ngOnInit(): void {
    this.sub = this.teamDB
      .getTeams()
      .subscribe((teams) => (this.teams = teams));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
