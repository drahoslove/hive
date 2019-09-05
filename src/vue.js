import * as settings from './settings.js'
import { _ } from './lang.js'


const help = new Vue({
  el: '#help',
  data: settings.getAll(),
})

const sets = new Vue({
  el: '#settings',
  data: settings.getAll(),
  watch: settings.setAll(),
  filters: { _ }
})

settings.subscribe((settings) => {
  help.lang = settings.lang
  sets.lang = settings.lang
})