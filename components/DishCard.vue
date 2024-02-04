<template>
  <v-card
    v-if="isEntering"
    v-intersect="intersectDish"
    color="transparent"
    class="dishcard mx-sm-1 my-10 sm:w-1/3 xs-w-9-12 xxs-w-9-12"
    :class="{ 'd-none': !isEntering }"
    elevation="0"
    max-width="90vw"
    :min-width="carousel ? '90%' : '330px'"
  >
    <v-img
      height="70"
      :lazy-src="props.dish.image"
      :src="props.dish.image"
      class="imag"
    ></v-img>

    <v-card color="#303030" elevation="5">
      <v-card-item class="text-center">
        <v-card-title class="mt-2">{{ dish.name }}</v-card-title>
        <v-card-subtitle>
          <span class="me-1">Local Favorite</span>

          <v-icon color="red" icon="mdi-fire" size="small"></v-icon>
        </v-card-subtitle>
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>
        <v-card-subtitle>4.5 (413)</v-card-subtitle>
        <v-divider class="my-4"></v-divider>
        <div>
          <v-card-text v-if="dish.categories" class="text-subtitle-1">
            🍛 •
            <span
              v-for="cat in dish.categories"
              :key="cat"
              class="text-capitalize"
              >{{ cat }} <span v-if="cat != dish.categories.at(-1)">, </span>
            </span>
          </v-card-text>

          <v-card-text :class="{ 'pb-0': !carousel }">
            Small plates, salads & sandwiches - an intimate setting with 12
            indoor seats plus patio seating.
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
        <v-divider class="mx-4 my-4" />
        <v-card-text class="text-subtitle-1"
          >🥗 • Additional Available</v-card-text
        >

        <div class="pb-2">
          <v-chip-group
            v-model="selection"
            class="justify-center"
            column
            multiple
          >
            <v-chip
              v-for="(additional, index) in additionals"
              :key="index"
              filter
              selected-class="text-red"
              >{{ additional.name }}</v-chip
            >
          </v-chip-group>
        </div>

        <v-divider class="mx-4 my-4"></v-divider>
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
        <v-divider class="my-4"></v-divider>
        <v-card-text class="text-subtitle-1">
          <b> ${{ totalPrice }}</b> Total Dish Price
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-card>
</template>

<script setup>
  const selection = ref([])
  const isEntering = ref(false)
  const additionals = ref([
    { name: 'Extra spice' },
    { name: 'Extra Zatar' },
    { name: 'Onions' },
    { name: 'Add Olive oil' },
  ])
  const props = defineProps({
    carousel: { type: Boolean, required: false },
    dish: { type: Object, default: () => {} },
  })
  const cart = useCartStore()
  const expanded = ref(false)
  const intersect = ref(false)
  const cartDish = computed(() => cart.items[props.dish._id])
  const totalPrice = computed(() => {
    try {
      return Number(cartDish.value.quantity * cartDish.value.price)
    } catch (e) {
      return 0
    }
  })
  function intersectDish(isIntersecting, entries, observer) {
    // Navigating to the route with the obtained id
    if (entries && entries[0] && !entries[0].visible) intersect.value = false
    if (isIntersecting) {
      // console.log('intersectDish', isIntersecting, entries, observer)
      // console.log(isEntering.value)
      // isEntering.value = true
      // this.$router.push({ hash, scrollBehavior: () => false })
      // console.log(router.currentRoute.hash)
      //  setScrolledTo(targetId)
      //   console.log(scrolledTo.value, targetId)
    }
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  }
  onBeforeUnmount(() => {
    // This code will be executed just before the component is unmounted
    isEntering.value = false
    console.log('UNmounted!!!???', isEntering)
    // Perform any cleanup or teardown operations here
  })
  onMounted(() => {
    // This code will be executed just before the component is unmounted
    isEntering.value = true
    console.log('mounted!!!')
    // Perform any cleanup or teardown operations here
  })
</script>

<style scoped>
  .imag {
    z-index: 9999 !important;
    margin-bottom: -25px;
  }
</style>
