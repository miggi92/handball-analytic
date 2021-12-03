import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Club } from '../models/club.model';
import { ClubDatabaseService } from '../services/club-database.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'owner'];
  clubs: Club[] = [];
  sub: Subscription = new Subscription;

  constructor(private clubDB: ClubDatabaseService) { }

  ngOnInit(): void {
    this.sub = this.clubDB
      .getUserClubs()
      .subscribe(clubs => (this.clubs = clubs));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addClub(){
    this.clubDB.createClub({name: 'TEST'});
  }

}
