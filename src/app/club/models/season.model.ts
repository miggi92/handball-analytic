import { Game } from 'app/game/models/game.model';

export interface Season {
  id?: string;
  games?: Game[];
}
