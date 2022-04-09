import { Player } from './../../player/models/player.model';

export interface HistoryEntry {
  date: Date;
  event: string;
  teamId?: string;
  playerId?: string;
}
