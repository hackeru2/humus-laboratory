<template>
  <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
    <div>
      <v-card-text class="text-subtitle-1">💰 • Dish Price</v-card-text>

      <v-row dense class="justify-center">
        <v-row
          class="align-baseline"
          :class="!carousel ? 'flex-column' : ' align-baseline'"
          no-gutters
        >
          <v-col>
            <v-row style="width: 120px" no-gutters>
              <v-col>
                <v-card-subtitle> Quantity: </v-card-subtitle>
              </v-col>
              <v-col>
                <Quantity :dish="dish" style="margin: -12px" />
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-row style="width: 120px" no-gutters>
              <v-col>
                <v-card-subtitle>Price per dish: </v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-text
                  class="text-subtitle-1 m-0 p-0 mx-auto"
                  style="width: 66px"
                  >${{ dish.price }}.00</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-card-text class="text-subtitle-1">
              <b
                ><span class="text-grey">Total Dish Price: </span> ${{
                  totalPrice
                }}.00</b
              >
            </v-card-text>
          </v-col>
        </v-row>
      </v-row>
    </div>
  </v-lazy>
</template>

<script setup>
  const props = defineProps({
    carousel: { type: Boolean, required: false },
    dish: { type: Object, default: () => {} },
  })
  const cart = useCartStore()

  const cartDish = computed(() => cart.items[props.dish._id])
  const totalPrice = computed(() => {
    try {
      return Number(cartDish.value.quantity * cartDish.value.price)
    } catch (e) {
      return 0
    }
  })
</script>

<style></style>
