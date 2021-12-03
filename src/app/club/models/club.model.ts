import { Season } from "./season.model";

export interface Club{
  id?: string;
  owner?: string;
  name?: string;
  season?: Season[];
  players?: string[];
}
