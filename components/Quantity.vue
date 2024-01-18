<template>
  <v-card-text v-if="dish" class="mt-n2">
    <v-btn
      icon="i-material-symbols-add-circle-outline"
      variant="text"
      :disabled="disabledPlus"
      @click="cart.onClickAdd(dish)"
    />
    {{
      cart.items[dish._id ?? dish.dish_id]
        ? cart.items[dish._id ?? dish.dish_id].quantity
        : 0
    }}
    <v-btn
      icon="i-material-symbols-do-not-disturb-on-outline"
      :disabled="disabledMinus"
      variant="text"
      @click="cart.removeItem(dish._id)"
    >
    </v-btn>
  </v-card-text>
</template>

<script setup>
  import { useCartStore } from '@/stores/cart'
  import { computed } from 'vue'
  const { dish } = defineProps({
    dish: Object,
  })
  const cart = useCartStore()
  const disabledMinus = computed(
    () =>
      !cart.items[dish._id ?? dish.dish_id] ||
      !cart.items[dish._id ?? dish.dish_id].quantity,
  )
  const disabledPlus = computed(
    () =>
      cart.items[dish._id ?? dish.dish_id] &&
      cart.items[dish._id ?? dish.dish_id].quantity >= 99,
  )
</script>

<style>
  .v-btn-icon {
    width: auto;
  }
</style>
