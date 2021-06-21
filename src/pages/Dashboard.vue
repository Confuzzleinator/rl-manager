<template>
    <q-page>
        <q-list bordered separator>
            <q-item v-for="team in teams" :key="team.id" clickable v-ripple @click="navRoster(team.id)">
                <q-item-section avatar>
                    <img :src="team.logo">
                </q-item-section>
                <q-item-section>
                    {{team.name}}
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>
</template>

<script lang="ts">
import { db } from 'src/ts/db/database'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PageDashboard',
    async setup() {
        let teams = await db.teams.toArray()

        return {
            teams
        }
    },
    methods: {
        async navRoster(teamID: number) {
            await this.$router.push('/g/' + (this.$route.params.gid as string) + '/roster/' + teamID.toString())
        }
    }
})
</script>