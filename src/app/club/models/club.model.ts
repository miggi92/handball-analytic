import { Team } from 'app/team/models/team.model';
import { User } from 'app/user/models/user.model';
import { Season } from './season.model';

export interface Club {
  id?: string;
  owner?: User;
  name?: string;
  season?: Season[];
  teams?: Team[];
  players?: string[];
}
