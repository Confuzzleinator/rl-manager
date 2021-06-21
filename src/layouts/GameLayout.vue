<template>
    <q-layout view="hHh lpr lff">
        <q-header>
            <q-toolbar>
                <q-toolbar-title @click="titleClick()">RL Manager</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="menuDrawer" :width="200" bordered class="bg-grey-3">
            <q-list dense>
                <q-item 
                    clickable 
                    v-for="item in menuItems" 
                    :key="item.name"
                    @click="menuNav(item.link)"
                    :active="activeMenuItem == item.name"
                    active-class="active"
                    >
                    <q-item-section>
                        {{item.name}}
                    </q-item-section>
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
import Meta from 'src/model/meta'
import SaveGame from 'src/model/saveGame'
import { Database, db, setDB } from 'src/ts/db/database'
import { metaDB } from 'src/ts/db/metaDatabase'
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: 'GameLayout',

    async setup() {
        const route = useRoute()
        const router = useRouter()

        // Make sure database is loaded
        if(db == undefined) {
            const save = await metaDB.games.get(parseInt(route.params.gid as string)) as SaveGame
            setDB(new Database(save.db))
        }

        let activeMenuItem = ref('Dashboard')
        const menuDrawer = ref(true)
        const meta = await db.meta.get(1) as Meta
        const teamID = meta.team
        const menuItems = [
            {
                name: 'Dashboard',
                link: '',
                routeMatch: ''
            },
            {
                name: 'Roster',
                link: '/roster/' + teamID.toString(),
                routeMatch: 'roster'
            }
        ]

        router.afterEach((to) => {
            for(const item of menuItems) {
                const i = item as { name: string, link: string, routeMatch: string } // hack to get around typing error
                if(to.path.includes(i.routeMatch)) {
                    activeMenuItem.value = i.name
                }
            }
        })


        return {
            menuDrawer,
            menuItems,
            teamID,
            activeMenuItem
        }
    },

    methods: {
        async menuNav(route: string) {
            await this.$router.push('/g/' + (this.$route.params.gid as string) + route)
        },
        async titleClick() {
            await this.$router.push('/')
        }
    }
})


</script>

<style lang="scss" scoped>
.active {
    background-color: $blue-grey-2;
}
</style>