<template>
  <v-img
    :height="height ?? undefined"
    :width="width ?? undefined"
    :src="src"
    :alt="alt"
    @load="handleLoad"
    @error="handleError"
  >
    <template v-if="isLoading">
      <!-- Loading placeholder -->
      <v-skeleton-loader type="image" elevation="0" />
    </template>
  </v-img>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        required: false,
        default: 150,
      },
      height: {
        type: Number,
        required: false,
        default: 150,
      },
      alt: { type: String, false: true, default: '' },
      src: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isLoading: true,
      }
    },
    methods: {
      handleLoad() {
        this.isLoading = false
      },
      handleError() {
        // Handle error if needed
        this.isLoading = false
      },
    },
  }
</script>

<style scoped>
  .custom-image {
    position: relative;
  }
</style>
