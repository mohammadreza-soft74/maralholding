import colors from 'vuetify/es5/util/colors'

export default {

  server: {
    port: 3000, // default: 3000
    //host:'192.168.1.100'
    host: '192.168.43.64' // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - maral-front',
    title: 'maral-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

    '~/assets/yekan.css',
    '~/assets/styles.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/swall.js',
    '~/plugins/print.js',
    { src: '~/plugins/picker.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/device'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'


  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:'http://192.168.43.34:8000'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'شرکت محورسازان چیچست',
      short_name: 'شرکت محورسازان چیچست',
      lang: 'fa',
      dir : 'rtl',
      start_url: "/admin/item",
      display: "standalone",
      background_color: "white",
      theme_color: "white",
      orientation: "portrait-primary",
    },
    workbox: {
      enabled : true
    },


  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl:true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },



  // auth: {
  //
  // },
      auth:{

        strategies: {
              local: {
                user:{
                  property : false,
                  autoFetch:true
                },

                token: {
                  property: 'data.token',
                  type: 'Bearer',
                  name: 'Authorization',
                },

                endpoints: {
                  login: { url: '/api/auth/login', method: 'post' },
                  logout: { url: '/api/auth/logout', method: 'post' },
                  user: { url: '/api/user', method: 'get' }
                },
              },

            } ,

      redirect: {
        login: '/auth/login',
        logout: '/auth/login',
        callback: '/login',
        home: '/admin/item'
      },

      // strategies: {
      //   'laravelPassport': {
      //     provider: 'laravel/passport',
      //     endpoints: {
      //       userInfo: '/api/user'
      //     },
      //     url: 'http://192.168.43.34:8000',
      //     clientId: '2',
      //     clientSecret: '6vnZf85PzyvCgjCWQXgkA8RG5CRNB8oXL8mt8FH7',
      //   },
      // },
      },





  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}


