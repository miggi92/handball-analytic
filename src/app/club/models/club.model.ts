import { Team } from "src/app/team/models/team.model";
import { Season } from "./season.model";

export interface Club{
  id?: string;
  owner?: string;
  name?: string;
  season?: Season[];
  teams?: Team[];
  players?: string[];
}
