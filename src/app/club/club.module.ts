import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { SharedModule } from '../shared/shared.module';
import { ClubDialogComponent } from './dialogs/club-dialog.component';


@NgModule({
  declarations: [
    ClubListComponent,
    ClubDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClubRoutingModule
  ],
})
export class ClubModule { }
