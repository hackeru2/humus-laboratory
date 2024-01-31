<template>
  <v-card
    v-if="dish"
    color="transparent"
    class="mx-sm-1 my-10 sm:w-1/3 xs-w-9-12 xxs-w-9-12"
    elevation="0"
    max-width="90vw"
    min-width="250px"
  >
    <v-img height="70" :src="props.dish.image" class="imag"></v-img>

    <v-card color="#303030" elevation="5">
      <v-card-item class="text-center">
        <v-card-title class="mt-10">{{ dish.name }}</v-card-title>

        <v-expansion-panels>
          <v-expansion-panel :text="dish.desc" class="mt-4">
            <v-expansion-panel-title v-slot="{ expanded }">
              <p
                v-show="!expanded"
                style="
                  overflow: auto;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ dish.desc }}
              </p>
            </v-expansion-panel-title>
          </v-expansion-panel>
        </v-expansion-panels>
        <Quantity :dish="dish" class="mt-4" />

        <v-row justify="center">
          <v-card-subtitle>Price per dish</v-card-subtitle>
        </v-row>
        <v-card-text class="mt-2">${{ dish.price }}.00</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-icon color="yellow" icon="mdi-star" size="small"></v-icon>
            <div class="text-grey ms-4">
              <h6>{{ dish.star }}</h6>
            </div>
            <v-spacer></v-spacer>
            <v-card-title>${{ totalPrice }}</v-card-title>
            <div class="text-grey ms-4">
              <h5>Total Dish Price</h5>
            </div>
          </v-row>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-card>
</template>

<script setup>
  const props = defineProps({
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

<style scoped>
  .imag {
    z-index: 9999 !important;
    margin-bottom: -25px;
  }
</style>
