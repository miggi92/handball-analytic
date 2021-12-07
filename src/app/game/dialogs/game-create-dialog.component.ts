import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-club-create-dialog',
  template: `
    <h1 mat-dialog-title>Spiel erstellen</h1>
    <div mat-dialog-content>
    <p>Bitte die allgemeinen Spieldaten ausfüllen</p>
      <mat-form-field>
        <input matInput [(ngModel)]="data.date" type="date"/>
      </mat-form-field>
      <mat-form-field>
        <input placeholder="Gegner" matInput [(ngModel)]="data.opponent"/>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: [
  ]
})
export class GameCreateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<GameCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
