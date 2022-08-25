export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tshirt',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: "preconnect",href:"https://fonts.googleapis.com"},
      {rel:"preconnect", href:"https://fonts.gstatic.com", crossorigin:''},
      {href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap", rel:"stylesheet"},
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.css" }
    ],
    script:[
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.3.6/fabric.min.js'},
      { src: 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'},
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      
      // { src: 'https://unpkg.com/fabric@5.0.0/dist/fabric.min.js'},
    ]

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
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
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
