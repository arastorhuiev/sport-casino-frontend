import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { ToastService } from 'primevue'

const app = createApp(App)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
