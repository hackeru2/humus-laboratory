// stores/cart.ts
import { acceptHMRUpdate } from 'pinia'
import type { SubscriptionCallbackMutation } from 'pinia'
import { ref } from 'vue'

// Define the state type for your store
interface CartState {
  items: Record<string, any> // Adjust the type based on your actual item structure
}

export const useCartStore = defineStore('cart', () => {
  const loadCartFromLocalStorage = () => {
    // const storedCart = localStorage.getItem('cart')
    // return storedCart ? JSON.parse(storedCart).items : {}
  }

  const items = ref(loadCartFromLocalStorage())

  function addItem(item: any) {
    items.value = { ...items.value, [item.dish_id]: item }
  }

  function onClickAdd(dish: any) {
    const dish_id = dish._id
    const cart_item = items.value[dish_id]
    if (!cart_item) return createCartItem(dish)
    items.value[dish_id].quantity++
  }

  function createCartItem(dish: any) {
    return addItem({
      ...dish,
      _id: null,
      quantity: 1,
      dish_id: dish._id,
    })
  }

  function removeItem(_id: string) {
    console.log(_id)
    if (items.value[_id]) {
      items.value[_id].quantity--
    }
  }

  return { items, removeItem, addItem, onClickAdd }
})

// Subscribe to store mutations and update local storage
useCartStore().$subscribe(
  (mutation: SubscriptionCallbackMutation<CartState>, state) => {
    if (
      mutation.events &&
      'newValue' in mutation.events &&
      'dish_id' in mutation.events.target
    ) {
      delete state.items[mutation.events.target.dish_id]
    }

    const proxyState = JSON.parse(JSON.stringify(state))
    // localStorage.setItem('cart', JSON.stringify(proxyState))
    // console.log(localStorage.getItem('cart'))
  },
)

// Hot module replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
