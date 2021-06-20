import Dexie from 'dexie'
import SaveGame from 'src/model/saveGame'

class MetaDatabase extends Dexie {
    games: Dexie.Table<SaveGame, number>

    constructor() {
        super('meta')

        this.version(1).stores({
            games: '++id'
        })

        this.games = this.table('games')

        this.games.mapToClass(SaveGame)
    }
}

export const metaDB = new MetaDatabase()