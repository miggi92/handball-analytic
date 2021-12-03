import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { SharedModule } from '../shared/shared.module';
import { ClubCreateDialogComponent } from './dialogs/club-create-dialog.component';


@NgModule({
  declarations: [
    ClubListComponent,
    ClubCreateDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClubRoutingModule
  ],
})
export class ClubModule { }
