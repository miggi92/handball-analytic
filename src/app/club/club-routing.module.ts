import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubListComponent } from './club-list/club-list.component';

const routes: Routes = [
  { path: '', component: ClubListComponent },
  { path: 'detail/:clubId', component: ClubDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
