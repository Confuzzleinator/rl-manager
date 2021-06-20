<template>
  <q-page class='q-gutter-lg'>
    <div class='row justify-center'>
        <div class="text-h1">
          RL Manager
          <q-badge color="primary" class="text-caption">{{version}}</q-badge>
        </div>
    </div>
    <div class='row justify-center'>
      <q-btn label='New Game' color='primary' @click="newGame()"/>
    </div>
    <div class='row justify-center'>
      <q-btn label='Load Game' color='primary'/>
    </div>
    <div class='row justify-center'>
      <q-btn label='Changelog' color='primary'/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { version } from '../ts/meta/version'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    return {
      version
    }
  },
   methods: {
     async newGame() {
       await this.$router.push('/new')
     }
   }
});
</script>
