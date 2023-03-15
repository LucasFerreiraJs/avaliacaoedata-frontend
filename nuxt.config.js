export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'edatafront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-icone.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/_variables.scss'
  ],
  image: {
    dir: 'assets/images'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    '@/plugins/vee-validate.js',
    '@/plugins/dayjs',
    '@/plugins/axios',
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    '@nuxtjs/axios',
  ],


  axios: {
    baseURL: "https://localhost:7207"
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },
  router: {

    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '/',
        component: resolve(__dirname, 'pages/users/index.vue')
      })
    }
  }
}
