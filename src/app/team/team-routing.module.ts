import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  { path: '', component: TeamListComponent },
  { path: 'detail/:teamId', component: TeamDetailComponent },
  {
    path: ':teamId/players',
    loadChildren: () =>
      import('../player/player.module').then((m) => m.PlayerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
