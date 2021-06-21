import SaveGame from 'src/model/saveGame';
import { setDB, Database, db } from '../db/database';
import { metaDB } from '../db/metaDatabase';
import genPlayer from '../player/genPlayer';
import initTeams from '../team/initTeams';
import randBetween from '../utils/randBetween';

export default async function newSaveGame(name: string) {
    const gameID = await metaDB.games.add(new SaveGame(name, 'game', new Date(), new Date()))
    const dbName = 'game' + gameID.toString()
    const game = await metaDB.games.get(gameID) as SaveGame
    game.db = dbName
    await metaDB.games.put(game, gameID)
    setDB(new Database(dbName))

    for(let i = 0; i < 20; ++i) {
        const p = genPlayer()
        p.team = randBetween(1, 4)
        await db.players.add(p)
    }

    await initTeams()

    return gameID
}