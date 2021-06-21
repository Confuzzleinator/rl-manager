import Dexie from 'dexie'
import Meta from 'src/model/meta'
import Player from 'src/model/player'
import Team from 'src/model/team'

export class Database extends Dexie {
    meta: Dexie.Table<Meta, number>
    players: Dexie.Table<Player, number>
    teams: Dexie.Table<Team, number>

    constructor(db: string) {
        super(db)
        this.version(1).stores({
            meta: '++id',
            players: '++id, first, last, username, rating, potential, dob, team',
            teams: '++id'
        })

        this.meta = this.table('meta')
        this.players = this.table('players')
        this.teams = this.table('teams')

        this.meta.mapToClass(Meta)
        this.players.mapToClass(Player)
        this.teams.mapToClass(Team)
    }
}

export let db: Database

export function setDB(database: Database) {
    db = database
}

