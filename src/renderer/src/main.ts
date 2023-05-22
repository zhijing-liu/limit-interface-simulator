import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { loadDarkness, loadFont, loadThemeColor } from '@/style'

createApp(App)
  .use(createPinia())
  .use(() => loadDarkness(undefined, false))
  .use(() => loadFont())
  .use(() => loadThemeColor())
  .use(router)
  .mount('#app')
