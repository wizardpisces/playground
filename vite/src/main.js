import { createApp } from 'vue'
import App from './App.vue'
console.log('hello'); // will be replaced by rust to console.debug
createApp(App).mount('#app')
