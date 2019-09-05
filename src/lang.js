import * as settings from './settings.js'

const langs = ['en', 'cs']

export const _ = (...variants) => {
  return variants[langs.indexOf(settings.get('lang'))]
}


export function verb(key, gender) {
  switch(key) {
    case 'win':
      return {
        2: _('won', 'jsi vyhrál/a'),
        M: _('won', 'vyhrál'),
        F: _('won', 'vyhrála'),
        N: _('won', 'vyhrálo'),
      }[gender] || _('won', 'vyhrálo')
  }
}