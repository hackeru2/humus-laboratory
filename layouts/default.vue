<template>
  <div>
    <!-- <div class="container mx-auto"> -->

    <v-app
      id="inspire"
      :style="{ background: $vuetify.theme.themes.light.colors.primary }"
    >
      <mobile-nav v-if="!$nuxt.$vuetify.display.smAndUp.value" />

      <HomeSection />
      <SideBar v-if="$nuxt.$vuetify.display.smAndUp.value" />

      <v-main class="">
        <slot />
      </v-main>
      <!-- https://vuetifyjs.com/en/features/application-layout/
        TheFooter contains the v-footer -->
      <TheFooter />
    </v-app>
    <!-- </div> -->
  </div>
</template>
<style>
  /* .html {
    scroll-behavior: smooth;
  } */

  /* we will explain what these classes do next! */
</style>
