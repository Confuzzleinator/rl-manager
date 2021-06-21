<template>
    <q-page>
        <div class="row">
            <div class="text-h3">
                <img :src="team.logo"/>
                {{team.name}}
            </div>
        </div>
        <div class="row">
            <q-list>
                <q-item v-for="(player, index) in players" :key="player.id">
                    <q-item-section>{{player.username}} - {{ages[index]}} ({{player.rating}}/{{player.potential}})</q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script lang="ts">
import { db } from 'src/ts/db/database'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import getPlayerAge from '../ts/player/getPlayerAge'

export default defineComponent({
    name: 'PageRoster',
    async setup() {
        const route = useRoute()
        let team = await db.teams.get(parseInt(route.params.tid as string))
        const players = await db.players.where('team').equals(parseInt(route.params.tid as string)).toArray()

        const ages = ref<number[]>([])
        for(const player of players) {
            ages.value.push(await getPlayerAge(player))
        }

        return {
            team,
            players,
            ages
        }
    }
})
</script>