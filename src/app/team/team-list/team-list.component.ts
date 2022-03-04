import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actionsColumn'];
  teams: Team[];

  constructor() {}

  ngOnInit(): void {}
}
