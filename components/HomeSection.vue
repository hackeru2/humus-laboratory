<template>
  <v-img src="/paralax.png" class="custom-parallax" cover>
    <v-sheet
      height="900px"
      variant="transparent"
      max-width="90vw"
      color="transparent"
      class="sticky mx-auto sm:pl-40 sm:ml-30 md:pl-40 md:ml-40 d-flex flex-column justify-center align-center text-white p-10 text-center"
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
  </v-img>
</template>

<script setup>
  const dataStore = useDataStore()
</script>

<style>
  .custom-parallax {
    height: 100vh;
    width: 100vw;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .custom-parallax::before {
    content: '';
    display: block;
    padding: 0;
    margin: 0;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 50%,
        rgb(29, 29, 29) 100%
      ),
      linear-gradient(to top, rgba(255, 255, 255, 0) 85%, rgb(29, 29, 29) 100%),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 85%,

        rgba(29, 29, 29, 0) 100%
      );
    pointer-events: none; /* Ensure clicks pass through the overlay */
  }
</style>
