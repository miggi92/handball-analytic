import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-observation',
  templateUrl: './game-observation.component.html',
  styleUrls: ['./game-observation.component.scss']
})
export class GameObservationComponent implements OnInit {

  @Input() game;
  displayedColumns: string[] = ['number', 'name', 'actionsColumn'];

  constructor() { }

  ngOnInit(): void {
  }

}
