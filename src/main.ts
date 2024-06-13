import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTimes, faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

import "@/index.css"
import App from '@/App.vue'
import router from '@/router/index.ts'

library.add(faPencil, faTimes, faPlus, faCheck, faTrash)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("FontAwesomeIcon", FontAwesomeIcon)

app.mount('#app')
