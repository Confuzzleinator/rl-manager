<template>
    <q-layout view="hHh lpr lff">
        <q-header>
            <q-toolbar>
                <q-toolbar-title>RL Manager</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="menuDrawer" :width="200" bordered class="bg-grey-3">
            <q-list dense>
                <q-item clickable>
                    Dashboard
                </q-item>
                <q-item clickable>
                    Roster
                </q-item>
                <q-item clickable>
                    Schedule
                </q-item>
                <q-item clickable>
                    Other Random Page
                </q-item>
            </q-list>
        </q-drawer>

        Game Layout
        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>    
</template>

<script lang="ts">
import SaveGame from 'src/model/saveGame'
import { Database, db, setDB } from 'src/ts/db/database'
import { metaDB } from 'src/ts/db/metaDatabase'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'GameLayout',

    async setup() {
        const route = useRoute()
        if(db == undefined) {
            const save = await metaDB.games.get(parseInt(route.params.gid as string)) as SaveGame
            setDB(new Database(save.db))
        }
        const menuDrawer = ref(true)
        return {
            menuDrawer
        }
    }
})
</script>