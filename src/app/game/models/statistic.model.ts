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
  twoMinutes = 'twoMinutes',
  redCard = 'redCard',
  technicalError = 'technicalError',
  fastBreak = 'fastBreak',
  changeGoalkeeper = 'goalkeeperChange',
}

export class calcStatistic {
  eventType: EventType;
  game: Game;
  selectedPlayer: Player;
  selectedTeam: string;
  historyEntry: HistoryEntry;
  gameDB: GameDatabaseService;
  keeperStats: Statistic;

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
      if (this.eventType === EventType.changeGoalkeeper) {
        this.game.statistics.activeKeeper[this.selectedTeam] =
          this.selectedPlayer.id;
        this.gameDB.updateStatistics(this.game.id, this.game.statistics);
        return;
      }
      let index = -1;
      var team = this.game.statistics[this.selectedTeam];
      let stats: Statistic = team.find(
        (element) => element.playerId === this.selectedPlayer.id
      );
      this.getKeeper();

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

  private getKeeper() {
    let id;
    if (
      this.selectedTeam === 'home' &&
      this.game.statistics.away &&
      this.game.statistics.activeKeeper.away
    ) {
      this.keeperStats = this.game.statistics.away.find(
        (element) => element.playerId === this.game.statistics.activeKeeper.away
      );
      id = this.game.statistics.activeKeeper.away;
    } else if (
      this.game.statistics.home &&
      this.game.statistics.activeKeeper.home
    ) {
      this.keeperStats = this.game.statistics.home.find(
        (element) => element.playerId === this.game.statistics.activeKeeper.home
      );
      id = this.game.statistics.activeKeeper.home;
    }
    if (!this.keeperStats && id) {
      this.initPlayerStat(this.selectedPlayer.id);
    }
  }

  private changeHPI(
    eventType,
    stats: Statistic,
    goal: boolean = false
  ): Statistic {
    let valueChange;
    let keeperValue;
    switch (eventType) {
      case EventType.goal:
        valueChange = 6;
        keeperValue = -2;
        break;
      case EventType.missed:
        valueChange = -7;
        keeperValue = 8;
        break;
      case EventType.twoMinutes:
        valueChange = -3;
        break;
      case EventType.redCard:
        valueChange = -10;
        break;
      case EventType.technicalError:
        valueChange = -8;
        break;
      case EventType.fastBreak:
        if (goal) {
          valueChange = 5;
          keeperValue = -2;
        } else {
          valueChange = -8;
          keeperValue = 8;
        }
        break;
      default:
        break;
    }
    if (!valueChange) {
      return stats;
    }
    stats.hpi = stats.hpi + valueChange;
    if (this.keeperStats && keeperValue) {
      this.keeperStats.hpi = this.keeperStats.hpi + keeperValue;
    }
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
