import Team from 'src/model/team'
import teamsJson from '../../data/teams.json'
import newTeam from './newTeam'

export default async function initTeams() {
    for(const team of teamsJson.teams) {
        await newTeam(new Team(team.name, team.abbrev, team.logo))
    }
}