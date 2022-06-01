import { Component, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'app/team/models/team.model';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-club-create-dialog',
  template: `
    <h1 mat-dialog-title>Spiel erstellen</h1>
    <div mat-dialog-content>
      <p>Bitte die allgemeinen Spieldaten ausfüllen</p>
      <mat-form-field appearance="fill">
        <mat-label>Mannschaft</mat-label>
        <mat-select [(ngModel)]="data.game.teams.home">
          <mat-option *ngFor="let team of data.teams" [value]="team.id">
            {{ team.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="data.game.date" type="date" />
      </mat-form-field>
      <mat-form-field>
        <input
          placeholder="Gegner"
          matInput
          [(ngModel)]="data.game.teams.away"
        />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: [],
})
export class GameCreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      teams: Team[];
      game: any;
    }
  ) {
    this.data.game = {
      clubId: '',
      date: new Date(),
      teams: {
        home: '',
        away: '',
      },
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
