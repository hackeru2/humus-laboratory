<script setup lang="ts">
  import useVuetifyBreakpoint from '~/composables/useVuetifyBreakpoint'
  import { onMounted } from 'vue'
  const display = useVuetifyBreakpoint()

  /* Vuetify useTheme will not work with SSR enabled, more info - https://vuetify-nuxt-module.netlify.app/guide/server-side-rendering.html#vuetify-themes */
  // import { useCustomTheme } from '~/composables/custom-theme'
  // const { isDark } = useCustomTheme()
  onMounted(() => {
    return console.log(display)
  })
  /* Update on using the above technique - We now use SSR HTTP Client hints technique instead of the above - https://vuetify-nuxt-module.netlify.app/guide/server-side-rendering.html#ssr-http-client-hints */
</script>
<template>
  <div>
    <!-- <div class="container mx-auto"> -->
    <v-app
      id="inspire"
      :style="{ background: $vuetify.theme.themes.light.colors.primary }"
    >
      <!-- <v-app :theme="isDark ? 'dark' : 'light'"> -->
      <!-- https://vuetifyjs.com/en/features/application-layout/
        Navbar contains all nav components such as v-app-bar, v-system-bar, v-navigation-drawer, v-bottom-navigation -->
      <!-- <NavBar /> -->
      <v-card class="text-white mx-auto">{{
        (display, $nuxt.$vuetify.display.width)
      }}</v-card>
      <mobile-nav />
      <SideBar />
      <v-main class="py-4">
        <slot />
      </v-main>
      <!-- https://vuetifyjs.com/en/features/application-layout/
        TheFooter contains the v-footer -->
      <TheFooter />
    </v-app>
    <!-- </div> -->
  </div>
</template>
<style></style>
