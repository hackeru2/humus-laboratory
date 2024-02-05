<template>
  <v-layout
    style="height: 56px; position: fixed; z-index: 5000; width: 100%; top: 0px"
    class="mobile-nav"
  >
    <v-bottom-navigation v-model="model" color="#FF6259" mode="shift">
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        @click="navigateTo(link)"
      >
        <v-icon>{{ link.icon }}</v-icon>

        <span>{{ link.text }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script setup>
  import { links } from '@/assets/data/links'
  const model = ref(false)
  const router = useRouter()

  function navigateTo(link) {
    console.log(window.location.hash)
    router.push('/#' + link.text)
  }
  const dataStore = useDataStore()
  // Watch for changes in scrollTo
  watch(
    dataStore,
    ({ scrolledTo }) => {
      // persist the whole state to the local storage whenever it changes
      console.log(
        scrolledTo,
        (model.value = links.findIndex(({ text }) => text == scrolledTo)),
      )
    },
    { deep: true },
  )

  // Don't forget to stop watching when the component is unmounted
</script>
<script>
  export default {
    data() {
      return {
        showMobile: false,

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
    mounted() {
      this.showMobile = true
    },
  }
</script>
<style scoped>
  .mobile-nav {
    animation: fadeIn 0.5s ease-in;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
