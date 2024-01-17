// stores/car.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDishStore = defineStore('dish', () => {
  const dishes = ref([
    {
      _id: '_1',
      image: '500-g-humus.png',
      desc: 'Thin Crust',
      name: 'Hamburger',
      money: '$10.00',
      price: 10,
      star: '4.5',
    },
    {
      _id: '_2',
      image: '22.png',
      name: 'Pizza',
      desc: 'Thick bun',
      price: 25,
      money: '$25.00',
      star: '4.1',
    },
    {
      _id: '_3',
      image: '33.png',
      name: 'Sushi',
      desc: 'Lucid Energy',

      price: 15,
      money: '$15.00',
      star: '4.3',
    },
    {
      _id: '_4',
      desc: 'Great Distance!',
      image: '44.png',
      name: 'Gratin',
      price: 23,
      money: '$23.00',
      star: '4.9',
    },
  ])
  return { dishes }
})
