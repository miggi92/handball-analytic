import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamCreateDialogComponent } from 'src/app/team/dialogs/team-create-dialog.component';
import { Club } from '../models/club.model';
import { ClubDatabaseService } from '../services/club-database.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss'],
})
export class ClubDetailComponent implements OnInit {
  club: Club;
  sub: Subscription = new Subscription();
  clubID: string;

  constructor(
    private route: ActivatedRoute,
    private clubDB: ClubDatabaseService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.clubID = params['clubId'];
    });
  }

  ngOnInit(): void {
    this.sub = this.clubDB
      .getClub(this.clubID)
      .subscribe((club) => (this.club = club));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(TeamCreateDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clubDB.createTeam(this.clubID, {
          name: result,
        });
      }
    });
  }
}
