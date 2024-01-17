// composables/useVuetifyBreakpoint.js

import { ref, watchEffect } from 'vue'
export default function useVuetifyBreakpoint() {
  const smAndDown = ref(false)
  const { $vuetify } = useNuxtApp()

  if ($vuetify) {
    watchEffect(() => {
      
      smAndDown.value = $vuetify.display.smAndDown  
    })
  }

  return { smAndDown }
}
