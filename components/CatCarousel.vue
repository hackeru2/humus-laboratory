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

  <v-slide-group v-model="model" selected-class="selected-class" show-arrows>
    <v-slide-group-item
      v-for="(item, n) in items"
      :key="n"
      v-slot="{ isSelected, toggle, selectedClass }"
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
        <div class="d-flex fill-height align-center justify-center">
          <v-scale-transition>
            <v-icon
              v-if="isSelected"
              color="white"
              size="48"
              icon="mdi-close-circle-outline"
            ></v-icon>
          </v-scale-transition>
        </div>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>

  <CatDataIterator :model-dishes="modelDishes" />
</template>
<script setup>
  const props = defineProps({
    items: { type: Array, default: () => [] },
  })
  const dataStore = useDataStore()
  const dishStore = useDishStore()
  const model = ref(null)
  const selectedName = computed(() => {
    try {
      return props.items[model.value].name
    } catch (e) {
      return ''
    }
  })
  const modelDishes = computed(() =>
    dishStore.dishes.filter(
      (d) => d.categories && d.categories.includes(selectedName.value),
    ),
  )
</script>
<script>
  import CatAvatar from '@/components/CatAvatar.vue'
  import DishCard from './DishCard.vue'
  export default {
    components: { DishCard, CatAvatar },
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
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
