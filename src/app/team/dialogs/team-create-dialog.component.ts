import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-create-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'CreateTeam' | translate }}</h1>
    <div mat-dialog-content>
      <p>{{ 'CreateTeamForm.Name.Label' | translate }}</p>
      <mat-form-field>
        <input
          placeholder="{{ 'CreateTeamForm.Name.Placeholder' | translate }}"
          matInput
          [(ngModel)]="data.name"
        />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">
        {{ 'Cancel' | translate }}
      </button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>
        {{ 'Create' | translate }}
      </button>
    </div>
  `,
  styles: [],
})
export class TeamCreateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TeamCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
