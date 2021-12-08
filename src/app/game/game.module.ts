import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SharedModule } from '../shared/shared.module';
import { GameCreateDialogComponent } from './dialogs/game-create-dialog.component';
import { GameObservationComponent } from './game-observation/game-observation.component';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    GameListComponent,
    GameDetailComponent,
    GameCreateDialogComponent,
    GameObservationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    MatExpansionModule
  ]
})
export class GameModule { }
