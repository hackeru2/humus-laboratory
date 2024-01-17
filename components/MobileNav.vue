<template>
  <v-layout
    v-show="$nuxt.$vuetify.display.xs.value"
    class="overflow-visible"
    style="height: 56px"
  >
    <v-bottom-navigation v-model="value" :bg-color="'transperent'" mode="shift">
      <v-btn v-for="(link, index) in links" :key="index">
        <v-icon>{{ link.icon }}</v-icon>
        <span>{{ link.text }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        links: [
          { text: 'Dashboard', icon: 'i-material-symbols-view-dashboard' },
          { text: 'Orders', icon: 'i-material-symbols-phone-classic' },
          { text: 'Restaurants', icon: 'i-material-symbols-map-marker-radius' },
          { text: 'Finance', icon: 'i-material-symbols-finance' },
          { text: 'Logout', icon: 'i-material-symbols-logout' },
        ],
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
