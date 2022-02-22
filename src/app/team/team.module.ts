import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TeamCreateDialogComponent } from './dialogs/team-create-dialog.component';

@NgModule({
  declarations: [
    TeamListComponent,
    TeamDetailComponent,
    TeamCreateDialogComponent,
  ],
  imports: [CommonModule, SharedModule, TeamRoutingModule],
})
export class TeamModule {}
