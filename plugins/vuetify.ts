import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = exportVuetify();

  nuxtApp.vueApp.use(vuetify)
})

export const exportVuetify = () => {
  return createVuetify({
    ssr: true,
    components: {
      ...components,
      VDataTableServer,
      VDataTable,
    },
    directives,
  })
}
