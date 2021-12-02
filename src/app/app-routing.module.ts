import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'club', loadChildren: () => import('./club/club.module').then(m => m.ClubModule), canActivate: [AuthGuard]
  },
  {
    path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule), canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
