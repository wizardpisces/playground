import { createApp } from 'vue'
import App from './App.vue'
import './wasm-sum.js';
import './wasm-game-of-life.js';
console.log('hello'); // will be replaced by rust to console.debug

createApp(App).mount('#app')

