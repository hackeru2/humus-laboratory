<template>
  <v-row>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        density="compact"
        placeholder="Search restaurant, Food, Cuisine or a Dish"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        rounded
        class="text-grey mx-8"
      ></v-text-field>
      <!-- <Categories /> -->
      <CatCarousel :items="items" :dish="dishes[0]" />
      <v-toolbar color="transparent" class="pr-1 mt-n2">
        <v-toolbar-title class="text-white">Popular Dishes</v-toolbar-title>

        <v-spacer></v-spacer>
        <span class="text-caption text-white">View More</span>
        <v-btn
          density="compact"
          icon="i-material-symbols-chevron-right-box"
          color="grey"
        ></v-btn>
      </v-toolbar>
      <h6 class="text-white ml-4 mt-n4">
        <span class="text-red">20+ new </span> dishes added this week
      </h6>
      <div
        class="d-flex flex-wrap justify-space-evenly mt-4"
        color="transparent"
      >
        <DishCard v-for="(dish, i) in dishes" :key="i" :dish="dish" />
      </div>
      <v-toolbar color="transparent" class="pr-1 mt-n2">
        <v-toolbar-title class="text-white">Order Reports</v-toolbar-title>

        <v-spacer></v-spacer>
        <span class="text-caption text-white">View all</span>
        <v-btn
          density="compact"
          icon="i-material-symbols-chevron-right-box"
          color="grey"
        ></v-btn>
      </v-toolbar>
      <h6 class="text-white ml-4 mt-n4">
        <span class="text-red">Wow 100+ new </span> Order got this week
      </h6>
      <v-card class="rounded-xl ma-2 pa-1" color="#424343">
        <v-row>
          <v-col cols="12" sm="1"> </v-col>
          <v-col cols="12" sm="2" class="text-center"
            ><span class="text-caption">Customer</span></v-col
          >
          <v-col cols="12" sm="2" class="text-center"
            ><span class="text-caption">Order number</span></v-col
          >
          <v-col cols="12" sm="2" class="text-center"
            ><span class="text-caption">address</span></v-col
          >
          <v-col cols="12" sm="2" class="text-center"
            ><span class="text-caption">Amount</span></v-col
          >
          <v-col cols="12" sm="2" class="text-center"
            ><span class="text-caption">Status</span></v-col
          >
          <v-col cols="12" sm="1" class="text-center"></v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col cols="12" sm="3" class=""
          ><v-avatar>
            <v-img src="~/public/20.jpg" alt="John"></v-img> </v-avatar
          ><span class="text-caption text-white ml-1">Jamsed Jhon</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">0123595874</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">Karking Teagha</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">$120.45</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center">
          <v-chip variant="flat" color="green"> Completed </v-chip></v-col
        >
        <v-col cols="12" sm="1" class="text-center"></v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col cols="12" sm="3" class=""
          ><v-avatar>
            <v-img src="~/public/30.jpg" alt="John"></v-img> </v-avatar
          ><span class="text-caption text-white ml-1">Peter Poker</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">36258475</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">City 1 november</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center mt-2"
          ><span class="text-caption text-white">$140.45</span></v-col
        >
        <v-col cols="12" sm="2" class="text-center">
          <v-chip variant="flat" color="orange"> Pending </v-chip></v-col
        >
        <v-col cols="12" sm="1" class="text-center"></v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <Checkout />
    </v-col>
  </v-row>
</template>

<script setup>
  import SidBar from '@/components/SideBar.vue'
  import DishCard from '@/components/DishCard.vue'
  import MobileNav from '@/components/MobileNav.vue'
  import Checkout from '@/components/Checkout.vue'
  import Categories from '@/components/Categories.vue'
  import CatCarousel from '@/components/CatCarousel.vue'
  import Quantity from '@/components/Quantity.vue'
  import { useDishStore } from '@/stores/dish'
  const dish = useDishStore()
  const dishes = dish.dishes
</script>
<script>
  export default {
    components: { DishCard, MobileNav, CatCarousel, Quantity, Checkout },
    data: () => ({
      items: [
        {
          name: 'humus',
        },
        {
          name: 'thina',
        },
        {
          name: 'falafel',
        },
        {
          name: 'spice',
        },
        {
          name: 'hatzils',
        },
        {
          name: 'soup',
        },
        {
          name: 'logo',
        },
      ],
    }),
  }
</script>
<style scoped>
  .mRight {
    margin-right: 100px;
  }
  .v-list {
    background: transparent !important;
  }
  .mLeft {
    margin-left: 90px;
  }
</style>
