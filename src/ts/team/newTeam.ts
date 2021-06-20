import Team from 'src/model/team';
import { db } from '../db/database';

export default async function newTeam(team: Team) {
    await db.teams.add(team)
}