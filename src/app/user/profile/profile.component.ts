import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Club } from 'app/club/models/club.model';
import { ClubDatabaseService } from 'app/club/services/club-database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  version = environment.version;
  clubs: Club[] = [];
  sub: Subscription = new Subscription();

  constructor(public auth: AuthService, private clubDB: ClubDatabaseService) {}

  ngOnInit(): void {
    this.sub = this.clubDB
      .getUserClubs()
      .subscribe((clubs) => (this.clubs = clubs));
  }

  changedActiveClub(event: MatSlideToggleChange) {
    if (event.checked) {
      this.auth.changeActiveClub(event.source.id);
    } else {
      this.auth.changeActiveClub('');
    }
  }
}
