<template>
  <v-card color="#4E4E4E" height="655" class="rounded-xl">
    <v-card class="mx-2 mt-4 rounded-lg" max-width="344" color="#6D6D6D">
      <v-card-item title="DELIVERY ADDRESS">
        <template #subtitle>
          <v-icon
            icon="mdi-map-marker-circle"
            size="18"
            class="me-1 pb-1"
          ></v-icon>

          Po.1478, Street No. 52 West New York
        </template>
      </v-card-item>
      <v-card-text class="mt-n3">
        <v-icon size="16" icon="mdi-clock-outline" class="mr-2"></v-icon>20
        min</v-card-text
      >
    </v-card>
    <v-toolbar color="transparent" class="pr-1 mt-n2">
      <v-btn icon="mdi-cart" class="hidden-xs-only"> </v-btn>

      <v-toolbar-title>Cart</v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="text-caption">Order ID: #1099</span>
    </v-toolbar>
    <v-card class="rounded-xl ma-2 pa-1 mt-n2" variant="outlined">
      <v-chip variant="flat" color="red"> Delivery </v-chip>
      <v-chip variant="text" class="ml-5"> Dine in </v-chip>
      <v-chip variant="text" color="red"> | </v-chip>
      <v-chip variant="text"> Takeaway </v-chip>
    </v-card>
    <template v-for="(item, i) in cart.items" :key="i">
      <!-- {{ item }} -->

      <v-card
        class="ma-2 mt-n2"
        :title="item.name"
        :subtitle="item.desc"
        color="transparent"
        flat
      >
        <template #prepend>
          <v-avatar color="">
            <v-img :src="item.image" alt="John"></v-img>
          </v-avatar>
        </template>
        <template #append>
          <Quantity :dish="item" />
          <!-- <v-btn
            density="compact"
            icon="mdi-circle-edit-outline"
            x-small
          ></v-btn> -->
        </template>
      </v-card>
      <v-divider inset class="mt-n2"></v-divider>
    </template>
    <v-card class="rounded-xl ma-2 pa-1 mt-n2" elevation="16">
      <v-chip variant="text" class="mRight"> Promotion Code </v-chip>

      <v-chip variant="flat" color="black"> TRYNEW </v-chip>
    </v-card>
    <v-card color="transparent" class="ma-2" flat>
      <v-list density="comfortable" class="text-white">
        <v-list-item title="Sub Total">
          <template #append>
            <v-btn variant="text">$155.20</v-btn>
          </template>
        </v-list-item>

        <v-list-item title="Delivery Charge">
          <template #append>
            <v-btn variant="text">$10</v-btn>
          </template>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item title="TOTAL">
          <template #append>
            <v-btn variant="text">$165.20</v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
    <v-chip variant="flat" color="black" class="px-10 mLeft">
      Confirm Order
    </v-chip>
  </v-card>
</template>
<script setup>
  const cart = useCartStore()
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
