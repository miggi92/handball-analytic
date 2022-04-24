import { DocumentReference } from '@angular/fire/compat/firestore';
import { Player } from '../../player/models/player.model';
import { HistoryEntry } from './history.model';
import { Statistic } from './statistic.model';

export interface Game {
  id?: string;
  clubId?: string;
  date?: Date;
  done?: boolean;
  created?: {
    by: string;
    at: Date;
  };
  teams?: {
    home?: DocumentReference;
    away?: DocumentReference;
  };
  players?: {
    home: Player[];
    away: Player[];
  };
  statistics?: {
    home: Statistic[];
    away: Statistic[];
    history: HistoryEntry[];
    activeKeeper: {
      home: string;
      away: string;
    };
  };
}
