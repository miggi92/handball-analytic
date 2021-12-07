import { Player } from "./player.model";

export interface Game{
  id?: string;
  clubId?: string;
  opponent?: string;
  date?: Date;
  created?: {
    by: string,
    at: Date
  };
  players?: Player[];
}
