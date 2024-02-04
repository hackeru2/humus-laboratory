<template>
  <v-lazy
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
    min-height="56"
  >
    <v-layout
      style="height: 56px; position: sticky; width: 100%; top: 0px"
      class="mobile-nav"
    >
      <v-bottom-navigation v-model="value" color="#FF6259" mode="shift">
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
  </v-lazy>
</template>
<script setup>
  import { links } from '@/assets/data/links'
  const router = useRouter()
  function navigateTo(link) {
    router.push('/#' + link.text)
  }
</script>
<script>
  export default {
    data() {
      return {
        showMobile: false,
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
    mounted() {
      this.$nextTick(() => {
        this.showMobile = true
      })
    },
  }
</script>
<style scoped>
  .mobile-nav {
    /* animation: fadeIn 0.5s ease-in; */
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
