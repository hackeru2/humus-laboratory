<template>
  <div>
    <!-- <div class="container mx-auto"> -->

    <v-app
      id="inspire"
      :style="{ background: $vuetify.theme.themes.light.colors.primary }"
    >
      <SideBar v-if="$nuxt.$vuetify.display.smAndUp.value" />
      <mobile-nav v-else />

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
<style></style>
