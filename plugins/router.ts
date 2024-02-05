// plugins/router.js
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  router.options.scrollBehavior = (to, from, savedPosition) => {
    // console.log({ toHASH: to.hash })
    // if (to.hash && to.hash === '#Home') {
    return { el: to.hash, behavior: 'smooth' }
    // }

    return savedPosition || { top: 0 }
  }
})
