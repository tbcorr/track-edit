import Vue from 'vue';
import createStore from './store';
import createRouter from './router';

import './styles/styles.scss';

import App from './App.vue';

import './registerServiceWorker';
import './plugins/element.js'

Vue.config.productionTip = false;

const store = createStore();
const router = createRouter();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
