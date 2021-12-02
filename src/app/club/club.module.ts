import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClubListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClubRoutingModule
  ]
})
export class ClubModule { }
