import { EventType } from './../models/statistic.model';
import { Game } from './../models/game.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/player/models/player.model';

@Component({
  selector: 'app-player-user-dialog',
  template: `
    <h1 mat-dialog-title>Spielerauswahl</h1>
    <div mat-dialog-content>
      <mat-tab-group>
        <mat-tab label="Heim">
          <div *ngIf="data.game">
            <p>Spielerauswahl</p>
            <div *ngIf="homePlayers">
              <section>
                <div class="button-row" *ngFor="let player of homePlayers">
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
        <mat-tab label="Auswärts"
          ><div *ngIf="data.game">
            <p>Spielerauswahl</p>
            <div *ngIf="data.game.players && data.game.players.away">
              <section>
                <div
                  class="button-row"
                  *ngFor="let player of data.game.players.away"
                >
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
              </section>
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
    public data: { data: any; game: Game; event: EventType }
  ) {
    if (data.event === EventType.changeGoalkeeper) {
      if (this.data.game.players.home) {
        this.homePlayers = this.data.game.players.home.filter(
          (player) => player.isKeeper === true
        );
      }
      if (this.data.game.players.away) {
        this.awayPlayers = this.data.game.players.away.filter(
          (player) => player.isKeeper === true
        );
      }
    } else {
      this.homePlayers = this.data.game.players.home;
      this.awayPlayers = this.data.game.players.away;
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
