<template>
    <q-page>
        <div class="row justify-center">
            <div class="text-h4">New Game</div>
        </div>
        <div class="row justify-center q-gutter-md">
            <div class="col-2 q-gutter-lg">
                <q-input label="Name" v-model="name"/>
                <q-select label="Team" v-model="team" :options="teamsSelection"/>
                <q-input label="Difficulty"/>
                <div class="row justify-center q-gutter-lg">
                    <q-btn label="Create" color="primary" @click="create()"/>
                    <q-btn label="Cancel" color="negative" @click="cancel()"/>
                </div>
            </div>
            <div class="col-2">
                <q-card class="infocard" flat>
                    <q-card-section>
                        <div class='text-h6'>Beta Warning</div>
                    </q-card-section>
                    <q-separator inset/>
                    <q-card-section>
                        <div>
                            The game is still very much in beta and many things may be broken. Additionally, games created
                            using past versions of the game are unlikely to work when loaded into newer versions.
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import newSaveGame from '../ts/meta/newSaveGame'
import teamsJson from '../data/teams.json'

export default defineComponent({
    name: 'PageNewGame',
    setup() {
        let name = ''
        let team
        let teamsSelection = []

        let index = 1
        for(const t of teamsJson.teams) {
            teamsSelection.push({
                label: t.name,
                value: index
            })

            ++index
        }

        team = ref(teamsSelection[0])

        return {
            name,
            team,
            teamsSelection
        }
    },
    methods: {
        async cancel() {
            await this.$router.push('/')
        },
        async create() {
            const id = await newSaveGame(this.name, this.team.value)
            await this.$router.push('/g/' + id.toString())
        }
    }
})
</script>


<style lang="scss" scoped>
.infocard {
    background-color: $warning;
}
</style>