<template>
  <v-toolbar
    id="Categories"
    v-intersect="dataStore.onIntersect"
    color="transparent"
    class="pr-1 mt-n2"
  >
    <v-toolbar-title class="text-white">Categories</v-toolbar-title>

    <v-spacer></v-spacer>
    <span class="text-caption text-white">View More</span>
    <v-btn
      density="compact"
      selected-class="selectedClass"
      icon="mdi-chevron-right-box"
      color="grey"
    />
  </v-toolbar>
  <h6 class="text-white ml-4 mt-n4">
    <span class="text-red">2+ new </span> categories added this week
  </h6>

  <v-slide-group v-model="model" selected-class="selected-class2" show-arrows>
    <v-slide-group-item
      v-for="(item, n) in items"
      :key="n"
      v-slot="{ toggle, selectedClass }"
    >
      <v-card
        color="none"
        :class="['ma-4', selectedClass]"
        class="rounded"
        height="100"
        width="100"
        @click="toggle"
      >
        <cat-avatar :item="item" :active="0" />
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
  <v-card>
    <!-- <v-tabs v-model="model" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs> -->
    <v-window v-model="model">
      <v-window-item v-for="(category, n) in items" :key="n" :value="n">
        <v-container fluid>
          <CatDataIterator :category="category" />
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
  <!-- -->
</template>
<script setup>
  const items = [
    {
      name: 'humus',
    },
    {
      name: 'thina',
    },
    {
      name: 'falafel',
    },
    {
      name: 'spice',
    },
    {
      name: 'hatzils',
    },
    {
      name: 'soup',
    },
    {
      name: 'logo',
    },
  ]
  const dataStore = useDataStore()
  const model = ref(null)
</script>
<script>
  import CatAvatar from '@/components/CatAvatar.vue'

  export default {
    components: { CatAvatar },
  }
</script>
<style>
  .selected-class {
    box-shadow: inset 0 0 10px #fff, /* inner white */ inset 4px 0 16px #f0f,
      /* inner left magenta short */ inset -4px 0 16px #0ff,
      /* inner right cyan short */ inset 4px 0 60px #f0f,
      /* inner left magenta broad */ inset -4px 0 60px #0ff,
      /* inner right cyan broad */ 0 0 10px #fff,
      /* outer white */ -2px 0 16px #f0f,
      /* outer left magenta */ 2px 0 16px #0ff; /* outer right cyan */
  }
  .list-enter-active,
  .list-leave-active {
    transition: box-shadow 0.5s ease;
    transition-delay: 3s;
  }
  .list-enter-from,
  .list-leave-to {
    /* opacity: 0;
    transform: translateX(30px); */
  }
</style>
