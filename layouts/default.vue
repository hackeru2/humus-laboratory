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
  .custom-parallax::before {
    content: '';

    display: block;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 50%,
        rgb(29, 29, 29) 100%
      ),
      linear-gradient(to top, rgba(255, 255, 255, 0) 85%, rgb(29, 29, 29) 100%),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 85%,

        rgba(29, 29, 29, 0) 100%
      );
    pointer-events: none; /* Ensure clicks pass through the overlay */
  }

  /* we will explain what these classes do next! */
</style>
