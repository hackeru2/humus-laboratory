import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataStore = defineStore('data', () => {
  // 1. State (ref, reactive, etc) / getters (computed)
  const scrolledTo = ref(null)
  //const getCount = computed(() => scrolledTo.value)

  // 2. Actions (functions)
  // const increment = () => (scrolledTo.value = "1")
  // const decrement = () => (scrolledTo.value = "-1")
  const setScrolledTo = (str) => {
    scrolledTo.value = str
    console.log({ scrolledTo })
  }
  return {
    scrolledTo,
    setScrolledTo,
    onIntersect,
  }

  function onIntersect(isIntersecting, entries, observer) {
    const targetId = entries[0].target.id

    // Navigating to the route with the obtained id
    if (isIntersecting) {
      console.log(targetId, entries[0])
      // this.$router.push({ hash, scrollBehavior: () => false })
      // console.log(router.currentRoute.hash)
      setScrolledTo(targetId)
      console.log(scrolledTo.value, targetId)
    }
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore as any, import.meta.hot))
}
