import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-create-dialog',
  template: `
    <h1 mat-dialog-title>Mannschaft erstellen</h1>
    <div mat-dialog-content>
      <p>Wie soll die Mannschaft heißen?</p>
      <mat-form-field>
        <input placeholder="Mannschaftsname" matInput [(ngModel)]="data.name" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>
        Create
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
