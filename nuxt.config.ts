import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use './assets/styles/settings.scss' as *;`,
        },
      },
    },
  },
  hooks: {
    'vite:extendConfig': (config) => {
      if(config.plugins) {
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: { configFile: 'assets/styles/settings.scss' },
          })
        )
      }
    },
  },
  sourcemap: {
    server: false,
    client: false
  },
})