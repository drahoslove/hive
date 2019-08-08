import Game from './game.js'
import uiOf from './ui.js'
import { rand, uncolorEmoji } from './common.js'
import { Hex } from './board.js'

let loaderInterval = 0
{
  const cp = document.getElementById("loader").innerText.codePointAt(0)
  const spinLoader = (i) => {
    loaderInterval = requestAnimationFrame(() => {
      document.getElementById("loader").innerText = String.fromCodePoint(
        cp+(i%12)
      )
      spinLoader(i+1)
    })
  }
  spinLoader(0)
}

console.log("Hive loaded")
console.time("")

const HELP_TEXT = `
Cílem je zablokovat ze všech stran včelí královnu spoluhráče

1) Pravidlo jedné kolonie:
 - Všichny vyložené kameny musí vždy tvořit jednotný nedělitelný útvar.

2) Vykládání:
 - Stejná pravidla pro všecny kameny.
 - Královna musí být umístěna nejpozději ve 4. kole.
 - Nové kameny můžeš umístit pouze do sousedství těch svých. První kámen umísti libovolně.
 - Nové kameny nesmíš umístit do sousedství těch protihráčových. S výjimkou druhého tahu.

3) Přesouvání:
 - Kameny můžeš přesouvat, až po té co umístíš královnu.
 - Přesouváním kamenů nesmíš porušit pravidlo 1) a to po celou dobu přesunu.
 - Kameny nejde vmáčknout do uzkých škvír kam se fyzicky neprocpou. (Kromě kobylky a berušky)
 - Různé kameny mají různé pravidla pohybu:

  A) Královna:
   - může se pohybovat jen o 1 krok
  B) Beruška:
   - může se pohybovat jen o 1 krok
   - navíc může vlést na jiný kámen a tím ho zablokovat
  C) Mravenec:
   - může se přesunout na libovolné místo dostupné po obvodu
  D) Pavouk:
   - může se přesunout na tři kroky vzdálené místo dostupné po obvodu
  E) Kobylka:
   - dostane se jen tam, kam jde přeskočit přes řadu jednoho či více kamenů

`

const canvas = document.getElementById('hiveCanvas')

let AiInterval
const game = new Game(12)
game.backButton = {
  label: '🠸',
  pos: new Hex(-6, 0),
  action: () => {
    clearInterval(AiInterval)
    ui.showMenu()
    ui.off()
    game.reset()
    ui.on(canvas)
  }
}
game.menu = [
  {
    label: '⚙',
    title: 'config',
    pos: new Hex(-2, +2),
    // action: () => { alert("nastavení zatím nefunguje")}
  },
  {
    label: '❓',
    title: 'help',
    pos: new Hex(-2, 0),
    action: () => { alert(HELP_TEXT)}
  },
  {
    label: '👤🌐👤',
    title: 'multi',
    pos: new Hex(0, -2),
    // action: () => { alert("multiplayer zatím není")}
  },
  {
    label: '👤×👽',
    title: 'single',
    pos: new Hex(+2, -2),
    action: vAI,
  },
  {
    label: '👤',
    title: 'training',
    pos: new Hex(+2, 0),
    action: () => {
      ui.disableInputFor([])
      ui.hideMenu()
    },
  },
  {
    label: '👽×👽',
    title: 'demo',
    pos: new Hex(0, +2),
    action: AIvAI,
  },
]


const ui = uiOf(game)
window.onload = () => {
  ui.on(canvas)
  console.timeEnd("")
  setTimeout(() => {
    cancelAnimationFrame(loaderInterval)
    document.getElementById("loader").innerHTML = ''
  }, 100)
}
// ui.off(canvas)
// setTimeout(()=>ui.on(canvas), 1500)

const autoMove = (players) => () => {
  if (!players.includes(game._activePlayerIndex)) {
    return
  }
  !game.selected
    ? game.onClick(
      rand(game.activePlayer().hand.size()+1)
        ? game.activePlayer().hand.__getRandomBugPos()
        : game.space.__randomBugPos(game.activePlayer().color)
      )
    : game.onClick(game.__randomLandingPos())

  // console.clear()
  // console.log(String(game.space))
  ui.touch()
  if (game.state === 'end') {
    clearInterval(AiInterval)
  }
}

function AIvAI() {
  ui.hideMenu()
  ui.disableInputFor([0,1])
  AiInterval = setInterval(autoMove([0, 1]), 50)
}

function vAI() {
  ui.hideMenu()
  ui.disableInputFor([1])
  AiInterval = setInterval(autoMove([1]), 800)
}

setTimeout(() => {
  // ui.downloadBackground()
}, 3000)