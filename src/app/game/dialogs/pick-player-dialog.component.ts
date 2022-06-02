import { EventType } from './../models/statistic.model';
import { Game } from './../models/game.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'app/player/models/player.model';

@Component({
  selector: 'app-player-user-dialog',
  template: `
    <h1 mat-dialog-title>Spielerauswahl</h1>
    <div mat-dialog-content>
      <mat-tab-group>
        <mat-tab label="Heim" *ngIf="homePlayers">
          <p>Spielerauswahl</p>
          <div class="button-grid">
            <div *ngFor="let player of homePlayers">
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
          </div>
        </mat-tab>
        <mat-tab label="Auswärts" *ngIf="awayPlayers">
          <p>Spielerauswahl</p>
          <div class="button-grid">
            <div *ngFor="let player of awayPlayers">
              <button
                mat-flat-button
                color="accent"
                (click)="onPlayerClick('away', player)"
                cdkFocusInitial
              >
                {{ player.number }} - {{ player.firstName }}
                {{ player.name }}
              </button>
            </div>
          </div></mat-tab
        >
      </mat-tab-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
  styles: [],
})
export class PickPlayerDialogComponent {
  homePlayers: Player[];
  awayPlayers: Player[];
  constructor(
    public dialogRef: MatDialogRef<PickPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      data: any;
      homePlayers: Player[];
      awayPlayers: Player[];
      event: EventType;
    }
  ) {
    if (data.event === EventType.changeGoalkeeper) {
      if (this.data.homePlayers) {
        this.homePlayers = this.data.homePlayers.filter(
          (player) => player.isKeeper === true
        );
      }
      if (this.data.awayPlayers) {
        this.awayPlayers = this.data.awayPlayers.filter(
          (player) => player.isKeeper === true
        );
      }
    } else {
      this.homePlayers = this.data.homePlayers;
      this.awayPlayers = this.data.awayPlayers;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPlayerClick(team, player) {
    this.data.data = { player: player, team: team };
    this.dialogRef.close(this.data);
  }
}
