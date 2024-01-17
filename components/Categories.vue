<template>
  <v-container class="pa-4 text-center">
    <v-row
      style="max-height: 130px; overflow-y: hidden"
      align="center"
      justify="center"
    >
      <cat-avatar
        v-for="(item, i) in items"
        :key="i"
        :item="item"
        :active="active === i"
        @clicked="active = active === i ? null : i"
      />
    </v-row>
  </v-container>
</template>
<script>
  import CatAvatar from '@/components/CatAvatar.vue'
  export default {
    components: { CatAvatar },
    data: () => ({
      active: null,
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
    methods: {
      onClicked(i) {},
    },
  }
</script>
