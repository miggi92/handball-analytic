import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { SharedModule } from '../shared/shared.module';
import { ClubCreateDialogComponent } from './dialogs/club-create-dialog.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';


@NgModule({
  declarations: [
    ClubListComponent,
    ClubCreateDialogComponent,
    ClubDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClubRoutingModule
  ],
})
export class ClubModule { }
