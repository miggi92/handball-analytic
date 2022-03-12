import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent
  ],
  imports: [CommonModule, PlayerRoutingModule],
})
export class PlayerModule {}
