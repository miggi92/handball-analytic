import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-statistic',
  templateUrl: './game-statistic.component.html',
  styleUrls: ['./game-statistic.component.scss'],
})
export class GameStatisticComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit(): void {}
}
