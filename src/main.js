import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import translate from './plugins/translate'

import 'simplebar' // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

createApp(App).use(router).use(translate).mount('body')
