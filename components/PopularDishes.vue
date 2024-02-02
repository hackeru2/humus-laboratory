<template>
  <v-toolbar color="transparent" class="pr-1 mt-n2">
    <v-toolbar-title
      id="Dishes"
      v-intersect="dataStore.onIntersect"
      class="text-white"
      >Popular Dishes</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <span class="text-caption text-white">View All</span>
    <v-btn density="compact" icon="mdi-chevron-right-box" color="grey" />
  </v-toolbar>
  <h6 class="text-white ml-4 mt-n4">
    <span class="text-red">20+ new </span> dishes added this week
  </h6>
  <v-card elevation="2">
    <div class="d-flex flex-wrap justify-space-evenly mt-4" color="transparent">
      <DishCard v-for="(_dish, i) in popularDishes" :key="i" :dish="_dish" />
    </div>
  </v-card>
</template>

<script setup>
  const dataStore = useDataStore()
  const dish = useDishStore()
  const popularDishes = dish.popularDishes
</script>

<style></style>
