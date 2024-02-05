<template>
  <v-lazy
    :options="{ threshold: 0.5 }"
    transition="fade-transition"
    min-height="125"
  >
    <div>
      <v-card-text v-if="dish.categories" class="dishcard-section-title">
        🍛 •
        <span v-for="cat in dish.categories" :key="cat" class="text-capitalize"
          >{{ cat }} <span v-if="cat != dish.categories.at(-1)">, </span>
        </span>
      </v-card-text>

      <v-card-text :class="{ 'pb-0': !carousel }">
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
        <v-spacer></v-spacer>
        <v-btn
          v-if="!carousel"
          :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="expanded = !expanded"
        ></v-btn>
        <v-expand-transition>
          <div v-show="carousel ? carousel : expanded">
            {{ dish.desc }}
          </div>
        </v-expand-transition>
      </v-card-text>
    </div>
  </v-lazy>
</template>

<script setup>
  const expanded = ref(false)
  const props = defineProps({
    carousel: { type: Boolean, required: false },
    dish: { type: Object, default: () => {} },
  })
</script>
