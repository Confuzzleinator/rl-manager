import Dexie from 'dexie'
import Player from 'src/model/player'
import Team from 'src/model/team'

export class Database extends Dexie {
    players: Dexie.Table<Player, number>
    teams: Dexie.Table<Team, number>

    constructor(db: string) {
        super(db)
        this.version(1).stores({
            players: '++id, first, last, username, rating, potential, dob, team',
            teams: '++id, name, abbrev, logo'
        })

        this.players = this.table('players')
        this.teams = this.table('teams')

        this.players.mapToClass(Player)
        this.teams.mapToClass(Team)
    }
}

export let db: Database

export function setDB(database: Database) {
    db = database
}

