import { Player } from "./player.model";

export interface Game{
  id?: string;
  clubId?: string;
  opponent?: string;
  date?: Date;
  done?: boolean;
  created?: {
    by: string,
    at: Date
  };
  players?: {
    home: Player[],
    opponent: Player[]
  }
}
