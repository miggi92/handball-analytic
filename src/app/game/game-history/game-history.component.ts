import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss'],
})
export class GameHistoryComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit(): void {}
}
