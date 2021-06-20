import Player from 'src/model/player';
import { db } from '../db/database';

// Adds player to the database
export default async function newPlayer(player: Player) {
    return await db.players.add(player)
}