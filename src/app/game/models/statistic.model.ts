import { Player } from 'src/app/player/models/player.model';
import { GameDatabaseService } from '../services/game-database.service';
import { Game } from './game.model';
import { HistoryEntry } from './history.model';

export interface Statistic {
  playerId?: string;
  goals?: number;
  missed?: number;
  getGoal?: number;
  saved?: number;
  incompletion?: number;
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
  incompletion = 'incompletion',
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
      if (this.eventType === EventType.changeGoalkeeper) {
        this.game.statistics.activeKeeper[this.selectedTeam] =
          this.selectedPlayer.id;
        this.gameDB.updateStatistics(this.game.id, this.game.statistics);
        return;
      }

      this.keeperStats();
      this.playerStats();

      this.gameDB.updateStatistics(this.game.id, this.game.statistics);
    }
  }

  private getOpponentTeam() {
    if (this.selectedTeam === 'home') {
      return 'away';
    } else {
      return 'home';
    }
  }

  private keeperStats() {
    let id;
    let keeper: Statistic;
    let index = -1;
    let opponentTeam = this.getOpponentTeam();
    var team = this.game.statistics[opponentTeam];

    if (!team) {
      return;
    }

    if (
      this.game.statistics[opponentTeam] &&
      this.game.statistics.activeKeeper[opponentTeam]
    ) {
      id = this.game.statistics.activeKeeper[opponentTeam];
      keeper = this.game.statistics[opponentTeam].find(
        (element) => element.playerId === id
      );
      index = team.indexOf(keeper);
    }
    if (!keeper && id) {
      this.initPlayerStat(this.selectedPlayer.id);
    }
    if (!keeper) {
      return;
    }

    switch (this.eventType) {
      case EventType.goal:
        keeper.getGoal++;
        break;
      case EventType.missed:
        keeper.saved++;
        break;
      default:
        return;
    }
    this.changeHPI(this.eventType, keeper);
    if (index !== -1) {
      team[index] = keeper;
    } else {
      team.push(keeper);
    }

    this.game.statistics[opponentTeam] = team;
    this.updateHistory(opponentTeam, keeper.playerId);
  }

  private playerStats() {
    let index = -1;
    var team = this.game.statistics[this.selectedTeam];
    if (!team) {
      return;
    }
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
        break;
      case EventType.missed:
        stats.missed++;
        break;
      case EventType.incompletion:
        stats.incompletion++;
        break;
      default:
        return;
    }
    this.changeHPI(this.eventType, stats);
    if (index !== -1) {
      team[index] = stats;
    } else {
      team.push(stats);
    }
    this.game.statistics[this.selectedTeam] = team;
    this.updateHistory(this.selectedTeam, this.selectedPlayer.id);
  }

  private updateHistory(team, playerId) {
    let historyEntry = {
      date: new Date(),
      event: this.eventType,
      teamId: team,
      playerId: playerId,
    };
    this.game.statistics.history.push(historyEntry);
  }

  private changeHPI(
    eventType,
    stats: Statistic,
    goal: boolean = false,
    goalKeeper: boolean = false
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
      case EventType.incompletion:
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

    if (!goalKeeper && valueChange) {
      stats.hpi = stats.hpi + valueChange;
    } else if (keeperValue) {
      stats.hpi = stats.hpi + keeperValue;
    }
    return stats;
  }

  private initPlayerStat(playerId): Statistic {
    return {
      playerId: playerId,
      goals: 0,
      missed: 0,
      incompletion: 0,
      getGoal: 0,
      saved: 0,
      hpi: 100,
    };
  }
}
