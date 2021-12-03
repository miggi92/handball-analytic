import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-club-dialog',
  template: `
    <h1 mat-dialog-title>Verein erstellen</h1>
    <div mat-dialog-content>
    <p>Wie soll der Verein heißen?</p>
      <mat-form-field>
        <input placeholder="Vereinsname" matInput [(ngModel)]="data.name"/>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.name" cdkFocusInitial>
        Create
      </button>
    </div>
  `,
  styles: [
  ]
})
export class ClubDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ClubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
