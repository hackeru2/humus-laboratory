<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="rounded"
      :elevation="isHovering ? 2 : 12"
      v-bind="props"
      height="100"
      width="100"
      variant="flat"
    >
      <v-overlay
        :model-value="isHovering"
        contained
        scrim="#036358"
        class="align-center justify-center rounded"
      >
        <v-btn variant="flat">{{ item.name }}</v-btn>
      </v-overlay>
      <v-avatar size="100" rounded>
        <v-img :lazy-src="item.name + '.png'" :src="item.name + '.png'" cover>
        </v-img>
      </v-avatar>
    </v-card>
  </v-hover>
</template>

<script setup>
  const props = defineProps({
    item: Object,
    active: Number,
  })
</script>

<style>
  .rounded {
    border-radius: 100px !important;
  }
</style>
