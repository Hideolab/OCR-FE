import './assets/main.css'
import './assets/vuetify.scss'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#0f121a',
          'primary-100': '#1a1d26',
          'primary-150': '#171b26',
          'primary-175': '#171b2680',
          secondary: '#252a37',
          'secondary-300': '#3c83f60d',
          'light-gray': '#292e3d',
          'light-blue': '#3c83f6',
          'gray-250': '#818898',
          'slate-30': '#f3f4f7',
        },
      },
    },
  },
  defaults: {
    global: {
      ripple: false,
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})

createApp(App)
  .use(vuetify)
  .mount('#app')
