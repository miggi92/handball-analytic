import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-create-dialog',
  template: `
    <h1 mat-dialog-title>Spiel erstellen</h1>
    <div mat-dialog-content>
      <p>Bitte die allgemeinen Spielerdaten ausfüllen</p>
      <mat-form-field>
        <input placeholder="Vorname" matInput [(ngModel)]="data.firstName" />
      </mat-form-field>
      <mat-form-field>
        <input placeholder="Nachname" matInput [(ngModel)]="data.name" />
      </mat-form-field>
      <mat-form-field>
        <mat-slide-toggle [(ngModel)]="data.isKeeper"
          >Torhüter?</mat-slide-toggle
        >
        <textarea matInput hidden></textarea>
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
export class PlayerCreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PlayerCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
