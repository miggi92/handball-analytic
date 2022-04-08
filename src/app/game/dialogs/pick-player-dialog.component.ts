import { Game } from './../models/game.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-user-dialog',
  template: `
    <h1 mat-dialog-title>Spielerauswahl</h1>
    <div mat-dialog-content>
      <mat-tab-group>
        <mat-tab label="Heim">
          <div *ngIf="data.game">
            <p>Spielerauswahl</p>
            <div *ngIf="data.game.players && data.game.players.home">
              <section>
                <div
                  class="button-row"
                  *ngFor="let player of data.game.players.home"
                >
                  <button
                    mat-flat-button
                    color="primary"
                    (click)="onPlayerClick('home', player)"
                    cdkFocusInitial
                  >
                    {{ player.number }} - {{ player.firstName }}
                    {{ player.name }}
                  </button>
                </div>
              </section>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Auswärts"> Content 2 </mat-tab>
      </mat-tab-group>
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
export class PickPlayerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PickPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: any; game: Game }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPlayerClick(team, player) {
    this.data.data = { player: player, team: team };
    this.dialogRef.close(this.data);
  }
}
