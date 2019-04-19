import Vue from 'vue'
import App from './App.vue'

import FeedbackInstaller from './'

Vue.config.productionTip = false

Vue.use(FeedbackInstaller, {
  baseUrl: 'https://www.easy-mock.com/mock/5cb93850184d1974e3bd9530/feedback'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
