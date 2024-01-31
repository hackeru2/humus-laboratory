// stores/car.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDishStore = defineStore('dish', () => {
  const dishes = ref([
    {
      _id: '_1',
      image: '500-g-humus.png',
      desc: 'Delight in the rich blend of chickpeas and tahini with our delectable Humus Fusion. A harmonious dish that transcends taste boundaries!',
      name: 'Savory Harmony Delight',
      categories: ['humus', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: true,
    },
    {
      _id: '_2',
      image: '500-g-humus.png',
      desc: 'Discover culinary ecstasy with our signature Humus Elysium. A symphony of chickpeas and sesame that promises a taste journey like no other!',
      name: 'Elysian Bliss Humus',
      categories: ['humus', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_3',
      image: '500-g-humus.png',
      desc: 'Embark on a gastronomic adventure with our Humus Royale – a divine amalgamation of chickpeas and tahini that will tantalize your taste buds!',
      name: 'Regal Chickpea Delight',
      categories: ['humus', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_3',
      image: '500-g-humus.png',
      desc: 'Indulge in a savory journey with our Hatzil Thina Temptation. Immerse yourself in the rich flavors of roasted eggplants and creamy tahini for a culinary delight!',
      name: 'Hatzilicious Thina Fusion',
      categories: ['hatzils', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_3',
      image: '500-g-humus.png',
      desc: 'Experience the perfect blend of Mediterranean flavors with our Thina Hatzil Harmony. Succulent grilled eggplants paired with smooth tahini – a taste sensation you won’t forget!',
      name: 'Mediterranean Thina Delight',
      categories: ['hatzils', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_4',
      image: 'spicy-humus.png',
      desc: 'Ignite your taste buds with our Sizzling Spice Fusion. A symphony of intense flavors that will transport you to a world of culinary excitement!',
      name: 'Flaming Spice Eruption',
      categories: ['spice'],
      money: '$12.00',
      price: 12,
      star: '4.7',
      popular: false,
    },
    {
      _id: '_5',
      image: 'spicy-humus.png',
      desc: 'Experience the thrill of bold flavors with our Spicy Sensation Supreme. An irresistible combination of spices that promises an explosion of taste!',
      name: 'Spice Blitz Extravaganza',
      categories: ['spice', 'hatzils'],
      money: '$14.00',
      price: 14,
      star: '4.9',
      popular: false,
    },
    // You can use the spicyDishes array as needed in your code.

    {
      _id: '_4',
      image: '22.png',
      name: 'Pizza',
      desc: 'Thick bun',
      price: 25,
      money: '$25.00',
      star: '4.1',
    },
    {
      _id: '_5',
      image: '33.png',
      name: 'Sushi',
      desc: 'Lucid Energy',

      price: 15,
      money: '$15.00',
      star: '4.3',
    },
    {
      _id: '_6',
      desc: 'Great Distance!',
      image: '44.png',
      name: 'Gratin',
      price: 23,
      money: '$23.00',
      star: '4.9',
    },
  ])
  const popularDishes = dishes.value.filter((dish) => dish.popular !== false)
  return { dishes, popularDishes }
})
