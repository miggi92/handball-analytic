import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SharedModule } from '../shared/shared.module';
import { GameCreateDialogComponent } from './dialogs/game-create-dialog.component';
import { GameObservationComponent } from './game-observation/game-observation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PickPlayerDialogComponent } from './dialogs/pick-player-dialog.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { GameStatisticComponent } from './game-statistic/game-statistic.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameDetailComponent,
    GameCreateDialogComponent,
    GameObservationComponent,
    PickPlayerDialogComponent,
    GameHistoryComponent,
    GameStatisticComponent,
    GameSettingsComponent,
  ],
  imports: [CommonModule, SharedModule, GameRoutingModule, MatExpansionModule],
})
export class GameModule {}
