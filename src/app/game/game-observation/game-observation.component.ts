import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-observation',
  templateUrl: './game-observation.component.html',
  styleUrls: ['./game-observation.component.scss']
})
export class GameObservationComponent implements OnInit {

  @Input() game;
  displayedColumns: string[] = ['date', 'opponent', 'actionsColumn'];

  constructor() { }

  ngOnInit(): void {
  }

}
