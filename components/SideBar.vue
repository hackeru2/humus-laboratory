<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail || $nuxt.$vuetify.display.smAndDown.value"
    permanent
    :floating="true"
    color="#2B2B2B"
  >
    <div>
      <my-img
        class="scale-11 mx-auto"
        src="/logo.png"
        :width="imgSize"
        :height="imgSize"
      />
    </div>
    <v-card class="rounded-e-xl me" width="60" height="400" color="#545454">
    </v-card>
    <v-list class="top">
      <v-list-item
        v-for="(item, i) in links"
        :key="i"
        :value="item"
        class="mb-5"
        color="#FF6259"
        variant="plain"
      >
        <template #prepend>
          <v-icon class="test" :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <div
      style="
        position: absolute;
        bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
      "
      @click="rail = !rail"
    >
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn
            icon="i-material-symbols-settings"
            size="small"
            color="#5F3B39"
          ></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-badge dot color="#FF6259">
            <v-btn
              icon="i-material-symbols-notifications"
              size="small"
              color="#5F3B39"
            ></v-btn>
          </v-badge>
        </v-col>
      </v-row>
    </div>
  </v-navigation-drawer>
</template>
<script setup>
  import { ref } from 'vue'
  import { links } from '@/assets/data/links'
  import MyImg from './MyImg.vue'

  import { onMounted } from 'vue'

  const drawer = ref(false)
  const imgSize = 150
  const rail = ref(false)

  onMounted(async () => {
    setTimeout(() => {
      drawer.value = true
    }, 5000)
  })
</script>

<style scoped>
  .v-list-item.v-list-item--active.v-list-item--link.border.v-theme--light.text-red.v-list-item--density-default.v-list-item--one-line.v-list-item--variant-text {
    color: white !important;
  }
  .top {
    margin-top: 60px;
  }
  .me {
    position: absolute;
    margin-top: 28px;
  }
  .v-locale--is-ltr .rounded-e-xl {
    border-top-right-radius: 44px !important;
    border-bottom-right-radius: 44px !important;
  }
  .a {
    top: 32%;
    left: 20.5%;
    position: absolute;
    height: 15px;
    width: 15px;
    background: linear-gradient(-90deg, #c33232, #545454 50%, black 50%);
    border-radius: 50%;
  }
  .scale-11 {
    transition: all 0.2s ease-in-out;
  }

  .scale-11:hover {
    transform: rotate(10deg);
  }
  .scale-11:active {
    transform: scale(0.95);
    transform: rotate(-10deg);
  }
</style>
