// stores/car.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDishStore = defineStore('dish', () => {
  const dishes = ref([
    {
      _id: '_3_a',
      image: 'humus_dish.png',
      desc: 'Indulge in a savory journey with our Hatzil Thina Temptation. Immerse yourself in the rich flavors of roasted eggplants and creamy tahini for a culinary delight!',
      name: 'Hatzilicious Thina Fusion',
      categories: ['hatzils', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_1',
      image: '500-g-humus-opacity.png',
      desc: 'Delight in the rich blend of chickpeas and tahini with our delectable Humus Fusion. A harmonious dish that transcends taste boundaries!',
      name: 'Savory Harmony Delight',
      categories: ['humus', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: true,
    },
    {
      _id: '_4',
      // image: 'spicy-humus.png',
      image: 'spice_opacity.png',
      desc: 'Ignite your taste buds with our Sizzling Spice Fusion. A symphony of intense flavors that will transport you to a world of culinary excitement!',
      name: 'Flaming Spice Eruption',
      categories: ['spice'],
      money: '$12.00',
      price: 12,
      star: '4.7',
      popular: false,
    },
    {
      _id: '_2',
      image: 'humus_thina.avif',
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
      image: 'humus_thina2.png',
      desc: 'Embark on a gastronomic adventure with our Humus Royale – a divine amalgamation of chickpeas and tahini that will tantalize your taste buds!',
      name: 'Regal Chickpea Delight',
      categories: ['humus', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },

    {
      _id: '_3_b',
      image: 'silver_humus_thina.png',
      desc: 'Experience the perfect blend of Mediterranean flavors with our Thina Hatzil Harmony. Succulent grilled eggplants paired with smooth tahini – a taste sensation you won’t forget!',
      name: 'Mediterranean Thina Delight',
      categories: ['hatzils', 'thina'],
      money: '$10.00',
      price: 10,
      star: '4.5',
      popular: false,
    },

    {
      _id: '_5',
      image: 'spice_extravagant.png',
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
      _id: '_6',
      image: 'falafel_delight.png',
      name: 'Mediterranean Bliss Falafel',
      desc: 'Crispy chickpea patties with a touch of Middle Eastern spices',
      price: 18,
      money: '$18.00',
      star: '4.7',
      categories: ['falafel'], // Added the category property with the value ["falafel"]
    },
    {
      _id: '_6_a',
      image: '33.png',
      name: 'Sushi',
      desc: 'Lucid Energy',

      price: 15,
      money: '$15.00',
      star: '4.3',
    },
    {
      _id: '_6_b',
      desc: 'Great Distance!',
      image: '44.png',
      name: 'Gratin',
      price: 23,
      money: '$23.00',
      star: '4.9',
    },
    {
      _id: '_6_c',
      image: 'soup4.png', // Assuming you have an image for soup named 'silver_soup.png'
      desc: 'Experience the perfect blend of Mediterranean flavors with our Soup Hatzil Harmony. Succulent grilled eggplants paired with smooth tahini – a taste sensation you won’t forget!',
      name: 'Mediterranean Soup Delight',
      categories: ['hatzils', 'soup'], // Adjusted the category to 'soup'
      money: '$18.00',
      price: 18,
      star: '4.5',
      popular: false,
    },
    {
      _id: '_6_d',
      image: 'falafel_hatzils.png',
      desc: "The dish described is a homemade falafel dish accompanied by purple vegetables, such as eggplant, purple cabbage, and potentially purple carrots. However, there's not a specific name for this particular combination beyond simply falafel with purple vegetables. Falafel is a traditional Middle Eastern food typically made from ground chickpeas or fava beans, mixed with herbs and spices, and then deep-fried into small patties or balls. The addition of purple vegetables adds a unique twist to the classic falafel dish, but it doesn't have a distinct name; it's a creative variation of serving falafel.",
      name: 'Purple Paradise Falafel Delight',
      categories: ['hatzils', 'falafel'], // Adjusted the category to 'soup'
      money: '$15.00',
      price: 15,
      star: '3.5',
      popular: false,
    },
  ])
  const popularDishes = dishes.value.filter((dish) => dish.popular !== false)
  return { dishes, popularDishes }
})
