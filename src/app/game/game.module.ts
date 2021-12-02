import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GameListComponent,
    GameDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule
  ]
})
export class GameModule { }
