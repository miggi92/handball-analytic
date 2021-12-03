import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Club } from 'src/app/club/models/club.model';
import { ClubDatabaseService } from 'src/app/club/services/club-database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  clubs: Club[] = [];
  sub: Subscription = new Subscription;

  constructor(public auth: AngularFireAuth, private clubDB: ClubDatabaseService) { }

  ngOnInit(): void {
    this.sub = this.clubDB
      .getUserClubs()
      .subscribe(clubs => (this.clubs = clubs));
  }

}
