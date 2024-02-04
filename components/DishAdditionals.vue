<template>
  <v-lazy :options="{ threshold: 0.5 }" transition="fade-transition">
    <div>
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
    </div>
  </v-lazy>
</template>
<script setup>
  const additionals = ref([
    { name: 'Extra spice' },
    { name: 'Extra Zatar' },
    { name: 'Onions' },
    { name: 'Add Olive oil' },
  ])
  const selection = ref([])
</script>
