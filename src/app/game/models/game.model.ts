import { Player } from '../../player/models/player.model';
import { Statistic } from './statistic.model';

export interface Game {
  id?: string;
  clubId?: string;
  opponent?: string;
  date?: Date;
  done?: boolean;
  created?: {
    by: string;
    at: Date;
  };
  players?: {
    home: Player[];
    away: Player[];
  };
  statistics?: {
    home: Statistic[];
    away: Statistic[];
  };
}
