import { Team } from 'src/app/team/models/team.model';
import { User } from 'src/app/user/models/user.model';
import { Season } from './season.model';

export interface Club {
  id?: string;
  owner?: User;
  name?: string;
  season?: Season[];
  teams?: Team[];
  players?: string[];
}
