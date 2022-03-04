import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamDatabaseService } from '../services/team-database.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  sub: Subscription = new Subscription();
  teamID: string;
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
