const langs = ['en', 'cs']

export const _ = (...variants) => {
  return variants[0]
}

export const __ = (...variants) => () => _(...variants)

export function verb(key, gender) {
  switch(key) {
    case 'win':
      return {
        2: _('won', 'vyhráváš'),
        M: _('won', 'vyhrál'),
        F: _('won', 'vyhrála'),
        N: _('won', 'vyhrálo'),
      }[gender] || _('won', 'vyhrálo')
  }
}