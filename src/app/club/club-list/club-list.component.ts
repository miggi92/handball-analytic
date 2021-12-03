import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Club } from '../models/club.model';
import { ClubDatabaseService } from '../services/club-database.service';
import { MatDialog } from '@angular/material/dialog';
import { ClubCreateDialogComponent } from '../dialogs/club-create-dialog.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'owner'];
  clubs: Club[] = [];
  sub: Subscription = new Subscription;

  constructor(private clubDB: ClubDatabaseService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.clubDB
      .getUserClubs()
      .subscribe(clubs => (this.clubs = clubs));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openClubDialog(): void {
    const dialogRef = this.dialog.open(ClubCreateDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clubDB.createClub({
          name: result
        });
      }
    });
  }

}
