// stores/car.js
// import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const loadCartFromLocalStorage = () => {
    // const storedCart = localStorage.getItem('cart')
    // return storedCart ? JSON.parse(storedCart).items : {}
    return {}
  }

  const items = ref(loadCartFromLocalStorage())
  function addItem(item) {
    items.value = { ...items.value, [item.dish_id]: item }
  }

  function createCartItem(dish) {
    return addItem({
      ...dish,
      _id: null,
      quantity: 1,
      dish_id: dish._id,
    })
  }

  function removeItem(_id) {
    console.log(_id)

    items.value[_id].quantity--
  }

  return { items, removeItem, addItem, onClickAdd }

  function onClickAdd(dish,id) {
    const dish_id = id
    const cart_item = items.value[id]
    if (!cart_item) return createCartItem(dish)
    items.value[id].quantity++
    //items.value[dish_id].quantity++;
  }
})

// useCartStore().$subscribe((mutation, state) => {
//   // import { MutationType } from 'pinia'
//   mutation.type // 'direct' | 'patch object' | 'patch function'
//   // same as cartStore.$id
//   mutation.storeId // 'cart'
//   // only available with mutation.type === 'patch object'
//   mutation.payload // patch object passed to cartStore.$patch()

//   // persist the whole state to the local storage whenever it changes
//   const proxyState = JSON.parse(JSON.stringify(state))
//   if (!mutation.events.newValue)
//     delete proxyState.items[mutation.events.target.dish_id]
//   localStorage.setItem('cart', JSON.stringify(proxyState))
//   console.log(localStorage.getItem('cart'))
// })
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
// }
