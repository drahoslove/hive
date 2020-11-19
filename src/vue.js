import * as settings from './settings.js'
import { _ } from './lang.js'


const help = new Vue({
  el: '#help',
  data: settings.getAll(),
})

const about = new Vue({
  el: '#about',
  data: settings.getAll(),
  filters: { _ },
})

const config = new Vue({
  el: '#settings',
  data: settings.getAll(),
  watch: settings.setAll(),
  filters: { _ },
})

settings.subscribe((data) => {
  [help, config, about].forEach(vueInstance => {
    Object.entries(data).forEach(([key, value]) => {
      vueInstance[key] = value || vueInstance[key]
    })
  });
})