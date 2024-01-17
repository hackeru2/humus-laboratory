<template>
  <v-card
    v-if="dish"
    color="transparent"
    class="mx-sm-6"
    :class="{
      'w-100': $nuxt.$vuetify.display.sm,
    }"
  >
    <v-img height="70" :src="dish.image" class="imag"></v-img>
    <v-card class="mt-n10" color="#303030">
      <v-card-item class="text-center">
        <v-card-title class="mt-10">{{ dish.name }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">Starting From</span>
        </v-card-subtitle>
        <Quantity :dish="dish" />
        <!-- <v-card-title v-if="cart.items._2.quantity"
            >${{ dish.price * cart.items._2.quantity }}.00</v-card-title
          > -->
        <v-card-title>${{ dish.price }}.00</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-icon
            color="yellow"
            icon="i-material-symbols-star"
            size="small"
          ></v-icon>
          <div class="text-grey ms-4">
            <h6>{{ dish.star }}</h6>
          </div>
          <v-spacer></v-spacer>
          <div class="text-grey ms-4">
            1360
            <h5>Total Sale</h5>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script setup>
  import Quantity from './Quantity.vue'
  import { useCartStore } from '@/stores/cart'
  const cart = useCartStore()
  const props = defineProps({
    dish: Object,
  })
</script>

<style scoped>
  .imag {
    z-index: 9999 !important;
  }
</style>
