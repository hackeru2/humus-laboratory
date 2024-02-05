// import { fileURLToPath, URL } from 'node:url'
import presetIcons from '@unocss/preset-icons'

import site from './site'
const {
  name,
  description,
  url,
  defaultLocale,
  identity,
  twitter,
  trailingSlash,
  titleSeparator,
} = site

export default defineNuxtConfig({
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  extends: [
    './my-nuxt-vuetify-tailwindcss-layer', // NavBar and Footer components
  ],
  //ssr: false,

  devtools: { enabled: false }, // Disable when using Vue devtools

  experimental: {
    // Required when customizing Vuetify sass variables via configFile with SSR enabled - https://vuetify-nuxt-module.netlify.app/guide/server-side-rendering.html#vuetify-sass-variables
    inlineSSRStyles: false,

    componentIslands: true,
  },

  app: {
    baseURL: '/', // defaulted by nuxt
    // Look into HeadAndMeta.vue for the rest
    head: {
      meta: [{ charset: 'utf-8' }], // defaulted by nuxt
    },
  },

  modules: [
    '@pinegrow/nuxt-module',
    '@unocss/nuxt',
    '@nuxt/devtools',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    // '@nuxtjs/html-validator',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'vuetify-nuxt-module',
    '@nuxtseo/module',
    '@nuxtjs/fontaine',
    '@nuxtjs/critters',
    'nuxt-icon',
    'nuxt-viewport',
  ],
  // https://dev.to/jacobandrewsky/improving-performance-of-nuxt-with-fontaine-5dim
  fontMetrics: {
    fonts: ['Inter', 'Kalam'],
  },

  // https://dev.to/jacobandrewsky/optimizing-css-performance-in-nuxt-with-critters-4k8i
  critters: {
    // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
    config: {
      // Default: 'media'
      preload: 'swap',
    },
  },

  // Vuetify's global styles
  css: [
    // '~/assets/css/main.css', // Used for global styles. This file is generally configured as cssPath with Pinegrow Vuetify Plugin
    // '~/assets/vuetify/main.scss', // If customizing Vuetify sass variables
    // 'lite-youtube-embed/src/lite-yt-embed.css',
    // 'vuetify/_styles.scss',
  ],

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Vuetify Nuxt module, thanks Joaquín (userquin)
  vuetify: {
    moduleOptions: {
      /* If customizing sass variables of vuetify components */
      /* If enabling this, set experimental.inlineSSRStyles to false */
      includeTransformAssetsUrls: {
        NuxtImg: ['src'],
        OgImage: ['image'],
        'v-carousel-item': ['src', 'lazySrc', 'srcset'],
        'v-card': ['image', 'prependAvatar', 'appendAvatar'],
      },

      ssrClientHints: {
        // reloadOnFirstRequest: true,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
        viewportSize: true,
      },
      //...
    },

    vuetifyOptions: './vuetify.config.ts', // This file is generally configured as configPath with Pinegrow Vuetify Plugin
  },

  image: {
    // dir: 'assets/images', // doesn't always work, for eg, with vercel etc, https://github.com/nuxt/image/issues/1006. Therefore, we are storing the images in public folder, to have them not processed by vite, but rather by nuxt-image module on-demand
    // sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw', // Global sizes not yet supported, has to be specified in NuxtImg or NuxtPicture tags - https://github.com/nuxt/image/issues/216
    // densities: [1,2], // default
    // quality: 80, // can be overridden as NuxtImg prop
    format: ['webp, png, jpg'], // default is ['webp']
    // The screen sizes predefined by `@nuxt/image`:
    // screens: {
    //   xs: 320,
    //   sm: 640,
    //   md: 768,
    //   lg: 1024,
    //   xl: 1280,
    //   xxl: 1536,
    //   '2xl': 1536,
    // },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80,
        },
      },
    },
    netlify: {
      baseURL: url,
    },
    domains: [
      'images.unsplash.com',
      'fakestoreapi.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'gravatar.com',
    ],

    alias: {
      unsplash: 'https://images.unsplash.com',
    },
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  content: {
    markdown: {
      anchorLinks: false,
      rehypePlugins: [
        [
          'rehype-external-links',
          {
            target: '_blank',
            rel: ['noopener'],
            test: (node: any) => /^https?:\/\//.test(node.properties.href),
          },
        ],
      ],
    },
    highlight: {
      theme: 'dracula-soft',
    },
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      'storeToRefs',
      'acceptHMRUpdate',
    ],
  },

  imports: {
    dirs: ['stores'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'lite-youtube',
    },
  },

  sourcemap: {
    client: false,
    server: false,
  },

  routeRules: {
    '/hidden': { index: false },
  },

  // Used by all modules in the @nuxtseo/module collection
  // https://nuxtseo.com/nuxt-seo/guides/configuring-modules
  site: {
    url,
    name,
    description,
    defaultLocale,
    // https://nuxtseo.com/nuxt-seo/guides/setting-an-identity
    identity,
    twitter,
    trailingSlash,
    titleSeparator,
  },
  robots: {
    // https://nuxtseo.com/robots/api/config#blocknonseobots
    blockNonSeoBots: true,
  },
  sitemap: {
    // https://nuxtseo.com/sitemap/guides/i18n#debugging-hreflang
    // Open https://the-ai-cafe.netlify.app/sitemap.xml
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '12.5%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      {
        label: 'Change Frequency',
        select: 'sitemap:changefreq',
        width: '12.5%',
      },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '12.5%' },
    ],
    // To turn off xls file when viewing sitemap.xml
    // xsl: false,
    // Remove strictNuxtContentPaths if using nuxt-content in documentDriven mode
    strictNuxtContentPaths: true,
  },
  ogImage: {
    // Open https://the-ai-cafe.netlify.app/__og_image__/og.png
    // defaults: {
    //   cacheTtl: 60 * 60 * 24 * 7, // 7 days
    // },
    // disable at a global level
    // runtimeCacheStorage: false,
    // or
    // defaults: {
    //   cache: false,
    // },
  },
  linkChecker: {
    enabled: false,
    excludeLinks: ['https://twitter.com/vuedesigner'],
    report: {
      html: true,
      markdown: true,
    },
  },

  unocss: {
    presets: [
      presetIcons({
        prefix: 'i-', // default prefix, do not change
      }),
    ],
  },

  pinegrow: {
    liveDesigner: {
      iconPreferredCase: 'unocss', // default value (can be removed), vuetify-nuxt-module uses the unocss format for icon names
      devtoolsKey: 'devtools', // see plugins/devtools.client.ts
      tailwindcss: {
        /* Please ensure that you update the filenames and paths to accurately match those used in your project. */
        configPath: 'tailwind.config.ts',
        cssPath: '@/assets/css/tailwind.css',
        // themePath: false, // Set to false so that Design Panel is not used
        // restartOnConfigUpdate: true,
        restartOnThemeUpdate: true,
      },
      vuetify: {
        configPath: 'vuetify.config.ts',
        utilities: true,
        // themePath: true, // Set to false so that tailwind Design Panel is used instead of Vuetify
        // restartOnConfigUpdate: true,
        restartOnThemeUpdate: true,
      },
      plugins: ['~/plugins/router.ts'],

      // plugins: [
      //   {
      //     name: 'My Awesome Lib 3.0',
      //     key: 'my-awesome-lib',
      //     pluginPath: fileURLToPath(
      //       new URL('./my-awesome-lib/web-types.json', import.meta.url),
      //     ),
      //   },
      // ],
    },
  },
})
