import { Player } from "./player.model";

export interface Game{
  id?: string;
  opponent?: string;
  players?: Player[];
}
