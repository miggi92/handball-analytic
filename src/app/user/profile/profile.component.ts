import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { mergeMapTo, Subscription } from 'rxjs';
import { Club } from 'src/app/club/models/club.model';
import { ClubDatabaseService } from 'src/app/club/services/club-database.service';
import { AuthService } from '../services/auth.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  version = environment.version;
  clubs: Club[] = [];
  sub: Subscription = new Subscription();

  constructor(public auth: AuthService, private clubDB: ClubDatabaseService, private afMessaging: AngularFireMessaging) {}

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
  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
  }
}
