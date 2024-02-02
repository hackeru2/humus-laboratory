<template>
  <div v-if="dish" class="quantity">
    <v-btn
      v-ripple="{ class: `text-red` }"
      icon="i-material-symbols-add-circle-outline"
      variant="text"
      :disabled="disabledPlus"
      @click="cart.onClickAdd(dish)"
    />
    <span class="quantity-number">
      {{
        cart.items[dish._id ?? dish.dish_id]
          ? cart.items[dish._id ?? dish.dish_id].quantity
          : 0
      }}</span
    >
    <v-btn
      v-ripple="{ class: `text-red` }"
      icon="i-material-symbols-do-not-disturb-on-outline"
      :disabled="disabledMinus"
      variant="text"
      @click="cart.removeItem(dish._id)"
    >
    </v-btn>
  </div>
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
  .quantity-number {
    margin: -4px -4px;
  }
  .dishcard .quantity {
    margin-bottom: -6px;
  }
</style>
