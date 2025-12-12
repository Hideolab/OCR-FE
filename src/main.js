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
          primary: '#3c83f6',
          secondary: '#252a37',
          accent: '#3c83f6',
          background: '#0f121a',
          surface: '#1a1d26',
          'surface-variant': '#252a37',
          'on-surface': '#ffffff',
          'on-background': '#ffffff',
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          border: '#292e3d',
          muted: '#818898',
          light: '#f3f4f7',
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
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

createApp(App)
  .use(vuetify)
  .mount('#app')
