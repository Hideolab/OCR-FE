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
          background: '#0f121a',
          surface: '#1a1d26',
          primary: '#3c83f6',
          secondary: '#252a37',
          'primary-150': '#171b26',
          'primary-175': 'rgba(23, 27, 38, 0.5)',
          'primary-200': 'rgba(37, 42, 55, 0.5)',
          'secondary-300': 'rgba(60, 131, 246, 0.05)',
          'light-gray': '#292e3d',
          'gray-250': '#818898',
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
