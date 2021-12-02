import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';


@NgModule({
  declarations: [
    ClubListComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule
  ]
})
export class ClubModule { }
