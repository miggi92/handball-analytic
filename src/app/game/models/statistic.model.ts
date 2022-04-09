import { Player } from 'src/app/player/models/player.model';
import { GameDatabaseService } from '../services/game-database.service';
import { Game } from './game.model';
import { HistoryEntry } from './history.model';

export interface Statistic {
  playerId?: string;
  goals?: number;
  missed?: number;
  hpi?: number;
}

export enum EventType {
  goal = 'goal',
  missed = 'noGoal',
}

export class calcStatistic {
  eventType: EventType;
  game: Game;
  selectedPlayer: Player;
  selectedTeam: string;
  historyEntry: HistoryEntry;
  gameDB: GameDatabaseService;

  constructor(
    selectedPlayer: Player,
    selectedTeam: string,
    eventType: EventType,
    game: Game,
    gameDB: GameDatabaseService
  ) {
    this.selectedPlayer = selectedPlayer;
    this.selectedTeam = selectedTeam;
    this.eventType = eventType;
    this.game = game;
    this.gameDB = gameDB;
  }

  process() {
    if (this.selectedPlayer) {
      let index = -1;
      var team = this.game.statistics[this.selectedTeam];
      let stats: Statistic = team.find(
        (element) => element.playerId === this.selectedPlayer.id
      );
      if (stats) {
        index = team.indexOf(stats);
      } else {
        stats = this.initPlayerStat(this.selectedPlayer.id);
      }

      switch (this.eventType) {
        case EventType.goal:
          stats.goals++;
          this.changeHPI(this.eventType, stats);
          break;
        case EventType.missed:
          stats.missed++;
          this.changeHPI(this.eventType, stats);
          break;
        default:
          break;
      }
      if (index !== -1) {
        team[index] = stats;
      } else {
        team.push(stats);
      }
      this.historyEntry = {
        date: new Date(),
        event: this.eventType,
        teamId: this.selectedTeam,
        playerId: this.selectedPlayer.id,
      };
      this.game.statistics[this.selectedTeam] = team;
      this.game.statistics.history.push(this.historyEntry);
      this.gameDB.updateStatistics(this.game.id, this.game.statistics);
    }
  }

  private changeHPI(eventType, stats: Statistic): Statistic {
    let valueChange;
    switch (eventType) {
      case EventType.goal:
        valueChange = 6;
        break;
      case EventType.missed:
        valueChange = -7;
        break;

      default:
        break;
    }
    if (!valueChange) {
      return stats;
    }
    stats.hpi = stats.hpi + valueChange;
    return stats;
  }

  private initPlayerStat(playerId): Statistic {
    return {
      playerId: playerId,
      goals: 0,
      missed: 0,
      hpi: 100,
    };
  }
}
