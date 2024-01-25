<template>
  <v-parallax src="/paralax.png" class="custom-parallax">
    <v-sheet
      height="900px"
      variant="transparent"
      max-width="90vw"
      color="transparent"
      class="mx-auto sm:pl-40 sm:ml-30 md:pl-40 md:ml-40 d-flex flex-column justify-center align-center text-white p-10 text-center"
    >
      <h1
        id="Home"
        v-intersect="dataStore.onIntersect"
        class="text-h4 font-weight-thin mb-4"
      >
        Humus Laboratory
      </h1>
      <h4 class="subheading">Order your Dish today!</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
        repellendus
      </p>
      <p>neque soluta autem natus enim quibusdam ut nemo veritatis</p>
      <p>
        Qquidem asperiores at aperiam ipsa quas eaque. Obcaecati rem dolorem
        saepe!
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat ipsa
        nihil quis libero dolorem sequi perspiciatis, quisquam, praesentium
        sapiente dolor voluptas inventore sunt magnam doloremque voluptatem
        dolorum beatae quo non.
      </p>
    </v-sheet>
  </v-parallax>
</template>

<script setup>
  const dataStore = useDataStore()
</script>

<style></style>
