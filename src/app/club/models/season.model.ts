import { Game } from "src/app/game/models/game.model";

export interface Season {
  id?: string;
  games?: Game[];
}
