import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as utils from './utils'

const app = createApp(App)

app.config.globalProperties.$utils = app.config.globalProperties.$utils || {}

app.use(router)

Object.keys(utils).forEach((key) => {
    app.config.globalProperties.$utils[key] = utils[key];
});

app.mount('#app')

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then(registration => {
                console.log("Service Worker registered with scope:", registration.scope)
            })
            .catch(error => {
                console.log("Service Worker registration failed:", error)
            })
    })
}