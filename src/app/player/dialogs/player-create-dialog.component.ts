import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-create-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'game.Create' | translate }}</h1>
    <div mat-dialog-content>
      <p>{{ 'FillInGameData' | translate }}</p>
      <mat-form-field>
        <input
          placeholder="{{ 'Firstname' | translate }}"
          name="firstname"
          matInput
          [(ngModel)]="data.firstName"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          placeholder="{{ 'Lastname' | translate }}"
          name="lastname"
          matInput
          [(ngModel)]="data.name"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-slide-toggle [(ngModel)]="data.isKeeper"
          >{{ 'Goalkeeper' | translate }}?</mat-slide-toggle
        >
        <textarea matInput hidden></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">
        {{ 'Cancel' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ 'Create' | translate }}
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
