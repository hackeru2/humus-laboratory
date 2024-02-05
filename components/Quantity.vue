<template>
  <v-row
    v-if="dish"
    class="quantity flex-nowrap"
    align="center"
    justify="center"
  >
    <v-btn
      v-ripple="{ class: `text-red` }"
      icon="i-material-symbols-add-circle-outline"
      variant="text"
      :disabled="disabledPlus"
      @click="cart.onClickAdd(dish, id)"
    />
    <span class="quantity-number">
      {{ cart.items[id] ? cart.items[id].quantity : 0 }}</span
    >
    <v-btn
      v-ripple="{ class: `text-red` }"
      icon="i-material-symbols-do-not-disturb-on-outline"
      :disabled="disabledMinus"
      variant="text"
      @click="cart.removeItem(id)"
    >
    </v-btn>
  </v-row>
</template>

<script setup>
  import { useCartStore } from '@/stores/cart'
  import { computed } from 'vue'
  const { dish } = defineProps({
    dish: Object,
  })
  const cart = useCartStore()
  const id = computed(() => (dish._id ? dish._id : dish.dish_id))
  const cartItem = computed(() => cart.items[id.value])
  const disabledMinus = computed(
    () => !cartItem.value || !cartItem.value.quantity,
  )
  const disabledPlus = computed(() => {
    return cartItem.value && cartItem.value.quantity >= 99
  })
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
