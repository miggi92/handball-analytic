import { Component, Input, OnInit } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'app-game-observation',
  templateUrl: './game-observation.component.html',
  styleUrls: ['./game-observation.component.scss'],
})
export class GameObservationComponent implements OnInit {
  @Input() game;
  displayedColumns: string[] = ['number', 'name', 'actionsColumn'];

  constructor(private snackBar: SnackService) {}

  ngOnInit(): void {}

  onClickEvent(eventType) {
    switch (eventType) {
      case 'goal':
        break;

      default:
        this.snackBar.error(`Event "${eventType}" not implemented yet!`);
        break;
    }
  }
}
