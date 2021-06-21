import Player from 'src/model/player';
import { date } from 'quasar'
import { db } from '../db/database';
import Meta from 'src/model/meta';

export default async function getPlayerAge(player: Player) {
    const meta = await db.meta.get(1) as Meta
    return date.getDateDiff(meta.date, player.dob, 'years')
}