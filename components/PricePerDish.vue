<template>
  <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
    <v-row
      :class="!carousel ? 'flex-column' : ' align-baseline'"
      dense
      class="justify-center w-1/2"
    >
      <Quantity :dish="dish" />
      <v-card-subtitle :class="{ 'mr-2': carousel }"
        >Price per dish
      </v-card-subtitle>
      <v-card-text class="d-contents text-subtitle-1"
        >${{ dish.price }}.00</v-card-text
      >
    </v-row>
  </v-lazy>
</template>

<script setup>
    const props = defineProps({
    carousel: { type: Boolean, required: false },
    dish: { type: Object, default: () => {} },
  })
</script>

<style></style>
