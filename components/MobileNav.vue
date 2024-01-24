<template>
  <v-layout
    class="overflow-visible"
    style="height: 56px; position: sticky; top: 10px"
  >
    <v-bottom-navigation v-model="value" color="#FF6259" mode="shift">
      <v-btn v-for="(link, index) in links" :key="index">
        <v-icon>{{ link.icon }}</v-icon>

        <span>{{ link.text }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script setup>
  import { links } from '@/assets/data/links'
</script>
<script>
  export default {
    data() {
      return {
        value: 0,
        tabs: null,
      }
    },
    computed: {
      color() {
        switch (this.value) {
          case 0:
            return 'blue-grey'
          case 1:
            return 'teal'
          case 2:
            return 'brown'
          case 3:
            return 'indigo'
          default:
            return 'blue-grey'
        }
      },
    },
  }
</script>
