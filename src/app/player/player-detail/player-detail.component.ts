import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Player } from '../models/player.model';
import { PlayerDatabaseService } from '../services/player-database.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
customIcons = {
  person: faIdBadge
}
  playerId;
  player: Player;
  sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private playerDB: PlayerDatabaseService) {
    this.route.params.subscribe((params) => {
    this.playerId = params['playerId'];
  }); }

  ngOnInit(): void {
    this.sub = this.playerDB
      .getPlayer(this.playerId)
      .subscribe((player) => (this.player = player));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onEdit(){}

}
