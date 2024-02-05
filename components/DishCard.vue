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
        <DishInfo :dish="dish" :carousel="carousel" />
        <v-divider class="mx-4 my-4" />
        <DishAdditionals />
        <v-divider class="mx-4 my-4"></v-divider>
        <PricePerDish :dish="dish" :carousel="carousel" />
      </v-card-item>
    </v-card>
  </v-card>
</template>

<script setup>
  const isEntering = ref(false)

  const props = defineProps({
    carousel: { type: Boolean, required: false },
    dish: { type: Object, default: () => {} },
  })
  const cart = useCartStore()

  const intersect = ref(false)
  const cartDish = computed(() => cart.items[props.dish._id])

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
