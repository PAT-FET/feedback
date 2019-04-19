import config from './config'
import Vue from 'vue'
import Feedback from '@/components/Feedback.vue'

export default function install (Vue: any, options?: typeof config) {
  Object.assign(config, options || {})
  Vue.component(config.componentName, Feedback)
}
