// Everything what has something to do with producing visual output or handling user input is in this file

// note hex coords:
// q:  __
// r:  \

import * as settings from './settings.js'
import { PriorityQueue, rand, seq } from './common.js'
import { Hex } from './board.js'
import { Queen } from './bugs.js'
import { __ } from './lang.js'
import { beep, analyze } from './audio.js'

export const hsl = (hue) => (sat) => (lig) => `hsl(${hue}, ${sat}%, ${lig}%)`;

const inverted = {
  black: 'white',
  white: 'black',
}
const base = {
  white: '#eed',
  black: '#112',
}
const lighter = {
  white: '#fff',
  black: '#666',
}
const darker = {
  white: '#999',
  black: '#000',
}

const grayer = {
  white: '#ccc',
  black: '#333',
}


// returns new Ui class for given space
export default function uiOf(game) {
  const TITLE = __("Hmyz.it", "Hmyziště")
  const soon = __('soon', 'brzy')
  const S = 64 // size of stone from point to point
  const Sf = S/16
  let CNW = 685
  let CNH = 685 + 67

  const HUE_CLICKABLE = 120
  const HUE_SELECTED = HUE_CLICKABLE - 60
  const HUE_LANDING = HUE_CLICKABLE + 60

  const SQRT3_2 = Math.sqrt(3)/2
  const SQRT2_3 = Math.sqrt(2)/3

  let loaderPos = {
    top: new Hex(-2, -7),
    bottom: new Hex(-9, 7),
  }
  let sideMenuPos = new Hex(-6, 0)
  const closerPos = new Hex(+3, -1.5)
  let closerActive = false

  const skipFrame = fps => 60 / +fps

  let _ctx
  let _canvas
  let _cachedBackground
  let _frames = 0
  let _target = null
  let _drawQue = new PriorityQueue()
  let _labelDrawQue = new PriorityQueue()

  let _invalidated = true
  let _someAnimating = false
  let _showMenu = true
  let _showNames = false
  let _disabledPlayers = []

  let _zoom = 1
  let _zoomStart = _zoom
  let _zoomSince

  let _beeRot = 0

  const hover = (target, note) => {
    target = target.round()
    if (target && (!_target || !target.eq(_target))) {
      _target = target
      _canvas.style.cursor = 'pointer'
      beep(note)
    }
  }

  const unhover = () => {
    _target = null
    _canvas.style.cursor = 'default'
  }

  return new class Ui {
    constructor() {
      document.fonts && document.fonts.load(`normal 1em 'Titan One'`, TITLE()).then(font => {
        console.log('font laoded', font)
        _invalidated = true
      })
    }
    on(canvas) {
      _canvas = canvas
      this.resize()
      _ctx = setupCanvasHDPI(_canvas, CNW, CNH, { alpha: true })

      // prepare cached background
      if (!_cachedBackground) {
        _cachedBackground = document.createElement('img')
        _cachedBackground.src = 'img/background.png'
        _cachedBackground.onload = (e) => {
          _invalidated = true
        }
        _cachedBackground.onerror = (e) => { // image does not exist - generate background
          _cachedBackground = document.createElement('canvas')
          const ctx = setupCanvasHDPI(_cachedBackground, CNW+S*2, CNH+S*SQRT3_2*2, { _willReadFrequently: true })

          // render background
          ctx.filter = "brightness(110%) contrast(30%) blur(2px)"
          ctx.translate(+S, +S*SQRT3_2)
          game.space.each((tile, hex) => drawTile(tile, hex, ctx))
          setTimeout(() => {
            this.downloadBackground()
          }, 0)
        }
      }

      canvas.addEventListener('mousemove', this.mouseMove)
      canvas.addEventListener('mousedown', this.mouseClick)
      canvas.addEventListener('mousewheel', this.mouseWheel)
      // document.addEventListener('keypress', this.keyPress)
      window.addEventListener('resize', this.resize)
      _invalidated = true
      this.startRenderLoop()
      return this
    }

    off(canvas) {
      this.stopRenderLoop()
      canvas = canvas || _canvas
      canvas.removeEventListener('mousemove', this.mouseMove)
      canvas.removeEventListener('mousedown', this.mouseClick)
      canvas.removeEventListener('mousewheel', this.mouseWheel)
      // document.removeEventListener('keypress', this.keyPress)
      window.removeEventListener('resize', this.resize)
      return this
    }

    disableInputFor(playerIndexes) {
      _disabledPlayers = playerIndexes
      _invalidated = true
    }

    showMenu() {
      _showMenu = true
      _invalidated = true
      document.body.classList.remove("dark")
      return this
    }

    hideMenu() {
      _showMenu = false
      _invalidated = true
      document.body.classList.add("dark")
      return this
    }

    touch() {
      _invalidated = true
    }

    resize(event) {
      CNW = window.innerWidth
      CNH = window.innerHeight
      _ctx = setupCanvasHDPI(_canvas, CNW, CNH, { alpha: true })
      loaderPos = {
        bottom: screenToHex({x: S*SQRT2_3+8, y: CNH-(S/2/SQRT3_2+4)}),
        top: screenToHex({x: S*SQRT2_3+8, y: S/2/SQRT3_2+4}),
        // screenToHex({x: S*SQRT2_3+8, y: CNH-(S+24)}),
        // screenToHex({x: S*SQRT2_3+8, y: S+24}),
      }
      sideMenuPos = screenToHex({x: CNW, y: CNH/2})
      game.players.forEach(({hand}, i) => {
        const size = hand.size()
        hand.each((bug, i) => {
          let {x, y} = hexToScreen(bug.pos)
          x = CNW/2 - 4.5*S*SQRT3_2 + (11-size+i)*S*SQRT3_2 -1
          if (bug.pos.r <= 0) {
            y = CNH * 0 +S
          } else {
            y = CNH * 1 -S
          }
          bug.pos = screenToHex({x, y}).round()
        })
        if (i === game._activePlayerIndex) {
          game.passButton.pos = screenToHex({
            x: CNW/2 - 4.5*S*SQRT3_2 + 10*S*SQRT3_2 -1,
            y: CNH * 1 -S*2,
          }).round()
        }
      })
      _invalidated = true
    }

    mouseWheel(event) {
      if (_showMenu) {
        return
      }
      event.preventDefault()
      _zoomStart = _zoom
      _zoomSince = performance.now()
      if (event.deltaY < 0) {
        _zoom *= Math.sqrt(Math.SQRT2)
      } else {
        _zoom /= Math.sqrt(Math.SQRT2)
      }
      if (_zoom > 2) {
        _zoom = 2
      }
      if (_zoom < .5) {
        _zoom = .5
      }
      _invalidated = true
    }

    mouseClick(event) {
      if (_showMenu) {
        const fired = game.topMenu().some((btn, i) => {
          if (btn.action && eventToExactHex(event).distance(btn.pos) <= 1) {
            btn.action()
            return true
          }
        })
        if (game.hasSubmenu()) {
          if (
            eventToExactHex(event).distance(closerPos) <= 0.5
            || !fired
          ) {
            game.menus.pop()
          }
        }
        return
      }
      game.sideMenu.forEach(({pos, action}) => {
        if (pos.add(sideMenuPos).distance(eventToExactHex(event)) <= .75) {
          action()
        }
      })

      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }
      const handTarget = eventToGuiHex(event)
      const spaceTarget = eventToSpaceHex(event)
      const target = game.activePlayer().hand.some(({pos}) => pos.eq(handTarget)) ||
        (game.canPass && game.passButton.pos.eq(handTarget))
          ? handTarget
          : spaceTarget
      game.click(target)
      _invalidated = true
    }

    mouseMove(event) {
      _invalidated = true // always animate on mousemove
      // main menu hover
      if (_showMenu) {
        const mouseHex = eventToExactHex(event)
        let hovered = false
        game.topMenu().forEach(({pos, action}, i) => {
          const active = game.topMenu()[i].active = mouseHex.distance(pos) <= 1 && (action || 'noaction')
          if (active && active !== 'noaction') {
            hover(pos)
            hovered = true
          }
        })
        if (game.hasSubmenu()) {
          closerActive = mouseHex.distance(closerPos) <= 0.5
          if (closerActive) {
            hover(closerPos)
            hovered = true
          }
        }
        hovered || unhover()
        const up = new Hex(1,-2)
        const mouseAngle = up.angle(mouseHex)
        _beeRot = mouseAngle / Math.PI * 180 + 45
        return
      }

      // loader hover:
      if (_showNames = Object.values(loaderPos).some(pos => eventToExactHex(event).distance(pos) <= .4)) {
        return unhover()
      }
      // sidemenu button hover:
      if (game.sideMenu.some(button => {
        const buttonPos = button.pos.add(sideMenuPos)
        if (buttonPos.distance(eventToExactHex(event)) <= .75) {
          button.active = true
          hover(buttonPos)
          return true
        } else {
          button.active = false
        }
      })) {
        return
      }
      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return unhover()
      }

      // stone hover:
      const handTarget = eventToGuiHex(event)
      const spaceTarget = eventToSpaceHex(event)
      const target = game.activePlayer().hand.some(({pos}) => pos.eq(handTarget)) ||
        (game.canPass && game.passButton.pos.eq(handTarget))
          ? handTarget
          : spaceTarget

      if (game.isClickable(target)) {
        hover(target, target === handTarget ? 'g3' : 'e3')
      } else {
        unhover()
      }
    }

    keyPress(event) {
      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }

      const handBug = game.activePlayer().hand.find((bug) =>
        bug.name[0].toLowerCase() === event.key
      )
      _invalidated = true
      if (handBug) {
        return game.click(handBug.pos)
      }

      const spaceBug = game.space.findBug((bug) =>
        bug.name[0].toLowerCase() === event.key &&
          bug.owner === game.activePlayer() &&
          bug !== game.selected &&
          !game.space.isHiveBridge(bug.pos)
      )
      if (spaceBug) {
        return game.click(spaceBug.pos)
      }
    }

    startRenderLoop() {
      this.stop = false
      this.touch()
      requestAnimationFrame(this.onFrame.bind(this))
    }

    stopRenderLoop() {
      this.stop = true
    }

    onFrame(t) {
      if (_frames++ % skipFrame(settings.get('fps')) === 0) {
        this.redraw(t)
      }
      if (!this.stop) {
        requestAnimationFrame(this.onFrame.bind(this))
      }
    }

    redraw(t) {
      if (settings.get('music') === 'on') { // audio visualisation
        _invalidated = true
      }
      if (_showMenu) {
        if (_invalidated) {
          drawBackground()
          drawMenu(t)
          _invalidated = _someAnimating || false
          _someAnimating = false
        }
        return
      }

      if (game.state === 'end') {
        setTimeout(() => {
          game.sideMenu.forEach((btn, i) => {
            if ([0,1].includes(i)) {
              btn.activeish = true
            }
          })
        }, 1500)
      } else {
        game.sideMenu.forEach((btn, i) => {
          if ([0,1].includes(i)) {
            btn.activeish = false
          }
        })
      }
      if (game.state === 'end' && game.futureMessage) {
        let i = 0
        const futureMessage = game.futureMessage
        game.futureMessage = undefined
        setTimeout(() => {
          const focusTo = game.dead
          const endScreen = () => {
            _invalidated = true
            if (game.state === 'end') {
              document.body.classList.remove('dark')
              game.message = futureMessage
              game.space.centralize(focusTo[++i % focusTo.length].pos.add(new Hex(4, 0)))
              setTimeout(endScreen, 600)
            } else if(!_showMenu) {
              document.body.classList.add('dark')
            }
          }
          endScreen()
        }, 1200)
      }

      let zoom = getAnimatedZoomLLevel()

      let [offsetX, offsetY] = [0, 0]

      if (_invalidated || this._oneMoreFrame) {
        if (zoom !== _zoom) {
          continueAnimation()
        }

        // DRAW SPACE

        // animate space shift
        if (game.space.animation) {
          const { dest, since } = game.space.animation
          const duration = 400
          const sofar = performance.now() - since

          const progress = sofar / duration
          const {x, y} = hexToScreen(dest.scale(1-progress))

          if (progress > 1) { // destination reached
            game.space.animation = null
          } else {
            continueAnimation()
            offsetX = x-CNW/2
            offsetY = y-CNH/2
          }
        }

        _ctx.translate((CNW-CNW*zoom)/2, (CNH-CNH*zoom)/2)
        _ctx.scale(zoom, zoom)


        _ctx.translate(offsetX, offsetY)

        // background
        drawBackground()

        // bugs
        game.space.each((tile, hex) => {
          drawBugsOftile(tile, hex, t)
        })

        if (_someAnimating) {
          game.disableInput()
        } else {
          game.enableInput()
        }

        // outlines (selected, path, and landings)
        if (game.selected) {
          game.landings.forEach(pos => {
            _drawQue.push(() => {
              drawOutline(pos, HUE_LANDING)
            })
          })
          if (_target && game.landings.some(landing => landing.eq(_target))) {
            (game.selected.pathTo(game.space, _target) || [game.selected, _target]).forEach((pos, i) => {
              i > 0 && _drawQue.push(() => drawDot(pos, HUE_LANDING), 3)
            })
          }
        }

        if (game.message) {
          _drawQue.push(() => {
            const {x, y} = hexToScreen(game.state === 'end' ? new Hex(4/2, 0) : new Hex(0, 0))
            // background
            seq(-1, +1).forEach(j => {
              seq(-12, +12).forEach(i => {
                if (Math.abs(i+j) >= 13) {
                  return
                }
                const hex = new Hex(i, j)
                if (game.state === 'end' && hex.distance(new Hex(-4, 0)) <= 1) {
                  return
                }
                const {x, y} = hexToScreen(hex)
                _ctx.save()
                hexPath(_ctx, x, y, S/2+1)
                _ctx.clip()
                // _ctx.globalCompositeOperation = 'destination-over'
                // drawBackground()
                _ctx.globalCompositeOperation = 'source-in'
                _ctx.fillStyle = `hsla(0, 0%, 20%, 0.5)`
                _ctx.fill()
                _ctx.restore()
              })
            })
            // text
            _ctx.font = "normal 40px monospace"
            const w = _ctx.measureText(game.message).width
            _ctx.fillStyle = '#eee'
            _ctx.fillText(game.message, x-w/2 -.5, y -.5)
            _ctx.fillStyle = '#111'
            _ctx.fillText(game.message, x-w/2 +.5, y +.5)
            _ctx.fillStyle = '#ddd'
            _ctx.fillText(game.message, x-w/2,     y   )
          }, 10)
        }

        // end

        // call deffered drawing stuff for board
        while(_drawQue.len() > 0) {
          _drawQue.pop()()
        }

        _ctx.translate(-offsetX, -offsetY)

        _ctx.scale(1/zoom, 1/zoom)
        _ctx.translate(-(CNW-CNW*zoom)/2, -(CNH-CNH*zoom)/2)

        // DRAW GUI
        game.players.forEach(({hand}) => {
          const lightness = settings.get('color') === 'black'
            ? [0, 100]
            : [100, 0]
          if (!hand.isEmpty()) {
            hand.each((bug) => {
              // draw 'shadows'
              const which = bug.pos.r < 0 // top or bottom hand
              const {x, y} = hexToScreen(bug.pos)
              const [X, Y, W, H] = !which
                ? [x-S*SQRT3_2/2, y, S*SQRT3_2, (CNH-y)]
                : [x-S*SQRT3_2/2, y, S*SQRT3_2, -y]
              const grad = _ctx.createLinearGradient(x+S*SQRT3_2*H/90, Y, x-S*SQRT3_2*H/90, Y+H)
              // for(let i = 0; i<360*3; i+=10) { // rainbow!
              //   grad.addColorStop(i/360/3, `hsla(${(Math.floor(t/2)% 360 - i)}, 50%, 50%, ${1-i/360/3})`)
              // }
              grad.addColorStop(0, `hsla(${(Math.floor(t/30)% 360)}, 0%, ${lightness[+which]}%, 1)`)
              grad.addColorStop(1, `hsla(${(Math.floor(t/30)% 360)}, 0%, 50%, 0)`)
              _ctx.fillStyle = grad
              _ctx.fillRect(X, Y, W, H)

              // bug itself
              drawBug(bug, undefined, true, t)
              if (bug.animation) {
                continueAnimation()
              }
            })
          }
        })

        game.canPass && drawPassButton(game.passButton)

        drawSideMenu(game.sideMenu)

        // call deffered drawing stuff for gui
        while(_drawQue.len() > 0) {
          _drawQue.pop()()
        }

         // end
        _invalidated = _someAnimating || false
        _someAnimating = false
        if (!_invalidated && !this._oneMoreFrame || _showNames) {
          this._oneMoreFrame = true
        } else {
          this._oneMoreFrame = false
        }
      }

      // render always:
      // if (game.space.midpoint) {
      //   drawDot(game.space.midpoint, 0)
      // }

      if (game.state !== 'end') {
        drawLoader(t, loaderPos[game.players[0].pos], game.players[0])
        drawLoader(t, loaderPos[game.players[1].pos], game.players[1])
      }
    }

    downloadBackground() {
      const link = document.createElement('a')
      link.download = 'background.png'
      link.href = _cachedBackground.url || _cachedBackground.toDataURL("image/png")
      link.click()
    }

  }

  function continueAnimation() {
    _someAnimating = true
  }

  // canvas related functions

  function setupCanvasHDPI(canvas, w, h, options) {
    let ratio = window.devicePixelRatio || 1
    if (ratio > 2) {
      ratio /= 2 // it would be too much pixels to render for mobiles with dpr 3 or more
    }
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w +'px'
    canvas.style.height = h +'px'
    // canvas.style.width = '100%'
    // canvas.style.height = 'auto'

    let ctx = canvas.getContext('2d', options);
    ctx.scale(ratio, ratio)
    return ctx
  }

  function getAnimatedZoomLLevel() {
    let zoom = _zoom // compute zoom animation progress
    const duration = 100
    const sofar = performance.now() - _zoomSince
    const progress = sofar/duration
    if (progress < 1) {
      zoom = _zoomStart*(1-progress) + _zoom*progress
    }
    return zoom
  }
  function drawBackground(noclear) {
    const { width, height } = _cachedBackground
    const z = _showMenu ? 1 : getAnimatedZoomLLevel()
    const OX = S
    const OY = S*SQRT3_2
    const SX = (CNW-CNW/z)/2
    const SY = (CNH-CNH/z)/2
    if (!noclear) {
      _ctx.clearRect(-CNW, -CNH, +CNW*3, +CNH*3)
      { // audio visualisation
        const anal = analyze()
        const step = 1
        for (let i = 0; i < anal.length - anal.length % 6; i+=step) {
          let val = 0
          for (let ii = i; ii < i+step; ii++) {
            val += anal[ii]
          }
          val /= step
          val /= 40
          const hex = new Hex(1.5-val+(i-i%6)/6, 0).rotate(i/step)
          drawTile(null, hex, _ctx)
        }
      }
    } 

    try {
      _ctx.drawImage(_cachedBackground,
        // some magic here
        (width-CNW)/2/z-OX+SX*(width/CNW), (height-CNH)/2/z-OY+SY*(height/CNH), CNW/z+OX*2, CNH/z+OY*2, // src
        -OX+SX, -OY+SY, CNW/z+OX*2, CNH/z+OY*2, // dest
      )
    } catch(e) { // IE issues with negative coords
      console.warn("Can't zoom in IE", e)
      _zoom = 1
      _zoomStart = 1
    }
  }

  function drawPassButton({pos, label, active}) {
    label = label()
    const r = S/2
    const textColor = '#6669'
    const base = hsl(-10)
    const bkg = base(active ? 65 : 0)
    if (_disabledPlayers.includes(game._activePlayerIndex)) {
      pos = pos.scale(1)
      pos.r *= -1
      pos.q -= pos.r
    }
    const {x, y} = hexToScreen(pos)
    // drawStone(x, y, r, bkg(50), [bkg(80), bkg(20)])
    game.isClickable(pos) && drawOutline(pos, HUE_CLICKABLE)

    //outline
    hexPath(_ctx, x, y, r-1)
    _ctx.strokeStyle = bkg(40)
    _ctx.lineWidth = 2
    _ctx.lineCap = 'round'
    _ctx.lineJoin = 'round'
    _ctx.stroke()
    // text
    _ctx.font = `normal bold ${Sf*3.5}px monospace`
    const w = _ctx.measureText(label).width
    _ctx.fillStyle = bkg(80)
    _ctx.fillText(label, x-w/2+.5, y+2+.5)
    _ctx.fillStyle = bkg(20)
    _ctx.fillText(label, x-w/2-.5, y+2-.5)
    _ctx.fillStyle = textColor
    _ctx.fillText(label, x-w/2,    y+2   )
  }

  function drawSideMenu(menu) {
    // const hues = [-10, 128, 318, 258]
    const hues = [0,1,2,3].map(i => -10 + i*360/4)
    menu.forEach(({pos, label, title, active, waiting, activeish}, i) => {
      title = title() + ' ➜ '
      pos = sideMenuPos.add(pos)
      const r = S/1.75
      const textColor = '#444'
      const base = hsl(hues[i])
      const bkg = base(Boolean(active) * 60 + Boolean(activeish || waiting) * 30)
      const {x, y} = hexToScreen(pos)
      drawStone(x, y, r, bkg(50), [bkg(80), bkg(20)])
      // symbol
      _ctx.font = `normal bold ${Sf*6}px emoji-symbols`
      const w = _ctx.measureText(label).width
      _ctx.fillStyle = textColor
      _ctx.fillText(label, x-r/2.5-w/2,    y+2   )
      // title
      if (active || activeish || waiting) {
        _ctx.font = `normal ${Sf*5}px monospace`
        const w = _ctx.measureText(title).width
        _ctx.fillStyle = game.state === 'end' ? '#eee' : '#111' // bkg(50)
        _ctx.fillText(title, x-S/2-w, y+4)
      }
    })
  }

  function drawMenu(t) {
    const textColor =  '#6669'

    const size = Sf*22

    const [x, y] = [ CNW/2,  (CNH/2 - 3*S)/2 + size*3/4 ]
    _ctx.font = `normal ${size}px 'Titan One'`
    if (!document.fonts || document.fonts.check(_ctx.font, TITLE())) {
      const w = _ctx.measureText(TITLE()).width
      _ctx.fillStyle = hsl(0)(0)(80)
      _ctx.fillText(TITLE(), x-w/2 +1, y +1)
      _ctx.fillStyle = hsl(0)(0)(10)
      _ctx.fillText(TITLE(), x-w/2 -1, y -1)
      _ctx.fillStyle = hsl(0)(0)(20)
      _ctx.fillText(TITLE(), x-w/2, y)

      if (TITLE().includes('.')) {
        _ctx.fillStyle = hsl(0)(0)(20)
        _ctx.font = `normal ${Sf*4.25}px 'Titan One'`
        let [x1, x2] = [x + Sf*33.75, x + Sf*44.75]
        _ctx.fillStyle = hsl(0)(0)(80)
        _ctx.fillText('š', x1 +.75, y +.75)
        _ctx.fillText('ě', x2 +.75, y +.75)
        _ctx.fillStyle = hsl(0)(0)(10)
        _ctx.fillText('š', x1 -.75, y -.75)
        _ctx.fillText('ě', x2 -.75, y -.75)
        _ctx.fillStyle = hsl(0)(0)(20)
        _ctx.fillText('š', x1, y)
        _ctx.fillText('ě', x2, y)
      }
    }

    // if (game.hasSubmenu()) {
    //   const r = S/3
    //   const textColor = '#444'
    //   const base = hsl(-10)
    //   const bkg = base(closerActive ? 65 : 0)
    //   const { x, y } = hexToScreen(closerPos)
    //   drawStone(x, y, r, bkg(50), [bkg(80), bkg(20)])

    //   // symbol
    //   const label = '✖'
    //   _ctx.font = `normal bold ${Sf*6}px emoji-symbols`
    //   const w = _ctx.measureText(label).width
    //   _ctx.fillStyle = textColor
    //   _ctx.fillText(label, x-w/2, y+8)
    // }

    game.topMenu().forEach(({pos, label, title, action, active, loading}, i, { length }) => {
      title = active === 'noaction' ? soon() : title()
      const huc = i * 6/length - (+1-6/length)/2 // hue coef
      const base = hsl(-60*(huc-5.3)) // set hue
      const bkg = base(active ? 80 : 50) // set saturation
      _ctx.filter = (action) ? 'none' : 'brightness(150%) grayscale(95%) opacity(25%)'

      const {x, y} = hexToScreen(pos)

      drawStone(x, y, S, bkg(50), [bkg(80), bkg(20)]) // set lightness

      // outline
      hexPath(_ctx, x, y, S-1)
      _ctx.strokeStyle = bkg(40)
      _ctx.lineWidth = 2
      _ctx.lineCap = 'round'
      _ctx.lineJoin = 'round'
      _ctx.stroke()

      // label icons
      _ctx.font = `normal bold ${Sf*9}px emoji-symbols`
      const w = _ctx.measureText(label).width
      _ctx.fillStyle = bkg(80)
      _ctx.fillText(label, x-w/2+.5, y+12+.5)
      _ctx.fillStyle = bkg(20)
      _ctx.fillText(label, x-w/2-.5, y+12-.5)
      _ctx.fillStyle = textColor
      _ctx.fillText(label, x-w/2, y+12)

      // button title
      if (active && !loading) {
        const titlePos = length > 3
          ? new Hex(0, 0)
          : pos.scale(2.25)
        const angle = length > 3
          ? 0 : [0, +30, -30][i]

        _labelDrawQue.push(() => {
          _ctx.font = `normal ${Sf*5}px monospace`
          const w = _ctx.measureText(title).width
          let {x, y} = hexToScreen(titlePos)
          doRatated(x, y, angle, () => {
            if (angle && i === 1) {
              x += S * 3/5
            }
            if (angle && i === 2) {
              x -= S * 3/5
            }
            _ctx.fillStyle = bkg(20)
            _ctx.fillText(title, x-w/2+1, y+4+1)
            _ctx.fillStyle = bkg(80)
            _ctx.fillText(title, x-w/2-1, y+4-1)
            _ctx.fillStyle = bkg(50)
            _ctx.fillText(title, x-w/2, y+4)
          })
          _ctx.filter = 'none'
        }, 4)
      }

      _ctx.filter = 'none'
    })
    // loading
    if (game.topMenu().some(({ loading }) => loading)) {
      const angle = t / 4 % 360
      const globe = '🌐'
      _ctx.font = `normal ${Sf*20}px emoji-symbols`
      const w = _ctx.measureText(globe).width
      const {x, y} = hexToScreen(new Hex(0, 0))

      doRatated(x, y, angle, (xo, yo) => {
          const clr = hsl(0)(0)
          _ctx.fillStyle = clr(60)
          _ctx.fillText(globe, x-w/2-1, y+24)
        })
      continueAnimation()
    } else {
      // bee
      if (game.menus.length === 1 && !game.topMenu().some(({ active }) => active)) {
        _beeRot += (11-rand(23))/12
        _beeRot %= 360

        const bee = new Queen()
        _ctx.font = `normal ${Sf*20}px emoji-symbols`
        const w = _ctx.measureText(bee.symbol).width
        const {x, y} = hexToScreen(new Hex(0, 0))

        doRatated(x, y, _beeRot, (xo, yo) => {
          const clr = hsl(bee.hue)(0)
          _ctx.fillStyle = clr(60)
          _ctx.fillText(bee.symbol, x-w/2, y+25)
        })
      }
    }
    while(_labelDrawQue.len() > 0) {
      _labelDrawQue.pop()()
    }
  }

  function doRatated(x, y, angle, func, mirror=true) {
    angle += 360
    angle %= 360
    const flip = !mirror && (angle > 90 && angle < 270) // flip if not mirrored to prevent upside-down
    const a = (Math.PI/180) * angle
    _ctx.translate(x, y)
    _ctx.rotate(a)
    flip && _ctx.scale(1, -1)
    _ctx.translate(-x, -y)
    typeof func === 'function' && func(Math.sin(a), Math.cos(a))
    _ctx.translate(x, y)
    flip && _ctx.scale(1, -1)
    _ctx.rotate(-a)
    _ctx.translate(-x, -y)
  }


  function hexToScreen({q, r}) {
    // let x = S/2 * (    3/2 * q                   )
    // let y = S/2 * (SQRT3_2 * q + Math.sqrt(3) * r)
    let x = S/2 * (Math.sqrt(3) * q + SQRT3_2 * r)
    let y = S/2 * (                       3/2 * r)
    x += CNW/2
    y += CNH/2
    return {x, y}
  }

  function screenToHex({x, y}) {
    x -= CNW/2
    y -= CNH/2
    // let q = ( 2/3 * x                     ) / (S/2)
    // let r = (-1/3 * x + Math.sqrt(3)/3 * y) / (S/2)
    let q = (Math.sqrt(3)/3 * x - 1/3 * y) / (S/2)
    let r = (                     2/3 * y) / (S/2)
    return new Hex(q, r)
  }

  function eventToSpaceHex({offsetX: x, offsetY: y}) {
    return screenToHex({x, y}).scale(1/_zoom).round()
  }

  function eventToGuiHex({offsetX: x, offsetY: y}) {
    return screenToHex({x, y}).round()
  }

  function eventToExactHex({offsetX: x, offsetY: y}) {
    return screenToHex({x, y})
  }

  function drawTile(tile, hex, ctx) {
    ctx = ctx || _ctx
    const {x, y} = hexToScreen(hex)


    const delta = hex.distance(new Hex(0,0))
    const opacity = tile ? 1 : .3
    const radius = tile ? S/2 : S/4 * (+delta/2)
    const cube = hex.toCube()
    const [r,g,b] = 'xzy'.split('').map(axis => Math.abs(cube[axis] * 20 + 150))

    ctx.strokeStyle = ctx.fillStyle = `rgba(${r},${g},${b},${(0.2 + 0.08*delta) * opacity})`
    ctx.lineWidth = 2
    hexPath(ctx, x, y, radius)
    ctx.fill()
    // ctx.stroke()
  }

  function drawBugsOftile(tile, hex, t) {
    tile.forEach((bug, i) => {
      const isTop = i === tile.length - 1

      const draw = () => drawBug(bug, i, isTop, t)

      const isMoving = Boolean(bug.animation)
      let prio = 0 + // most bugs are grounded
        +(i > 0) + // higher elevation on top
        +isMoving*2 // animating draw even higher

      _drawQue.push(draw, prio)
      if (isMoving){
        continueAnimation()
      }
    })
  }

  function drawBug(bug, elevation, isTop, t=0) {
    const offset = new Hex(+0.0, -0.2) // per one elevation level
    let r = S/2

    let pos = bug.pos

    if (bug.animation) { // drawing
      const  { ms, path, since, ease, delay, moveType } = bug.animation
      const sofar = performance.now() - since - delay
      const jumps = path.length-1
      const duration = ms*jumps * 1

      if (sofar > duration) { // destination reached
        bug.animation = null
      } else {
        // compute drawPos position during animation
        const t = ease(Math.min(Math.max(0, sofar/duration), 1))
        const i = Math.floor(t * jumps) // path segment index
        const diff = (i >= jumps)
          ? console.error('index jumped outof path') || new Hex(0,0) // this should not happen?
          : path[i+1].sub(path[i])
        const tSeg = (t * duration % ms)/ms // 0-1
        pos = path[i].add(diff.scale(tSeg))

        // animate descending / ascending
        if (moveType === 'move' && bug.name === 'Beetle') {
          const segSlope = game.space.slope(path[i], path[i+1], bug)
          const segElev = game.space.at(path[i]).length
          pos = pos.add(offset.scale(segElev))
          if (segSlope > 0) {
            pos = pos.add(offset.scale(segSlope * (tSeg < 1/5 ? tSeg * 5 : 1 )))
          }
          if (segSlope < 0) {
            pos = pos.add(offset.scale(segSlope * (tSeg > 4/5 ? tSeg * 5 - 4 : 0)))
          }
        }

      }
    } else {
      if (elevation) { // of destination
        pos = pos.add(offset.scale(elevation))
      }
    }


    let {x, y} = hexToScreen(pos)

    const highlighted = _target && _target.eq(bug.pos) && game.isClickable(_target) && isTop ||
    game.selected === bug
    if (highlighted) {
      r *= 1.25
    }

    let bugColor = settings.get('color') === 'white'
      ? inverted[bug.color]
      : bug.color

    drawStone(x, y, r, base[bugColor], [ lighter[bugColor], darker[bugColor] ])

    { // text
      const txt = bug.symbol
      _ctx.textBaseline = 'middle'
      _ctx.font = `normal ${Sf * (highlighted ? 12.5 : 10)}px emoji-symbols`
      const w = _ctx.measureText(txt).width
      _ctx.fillStyle = bug.hue !== undefined ? `hsla(${bug.hue}, ${highlighted ? 60 : 40}%, 50%, 1)` : '#808080'
      doRatated(x, y, bug.shiver(t), () => {
        _ctx.fillText(txt, x-w/2, y+2)
      }, bug.name !== 'Grasshopper')
    }

    if (
      isTop &&
      game.isClickable(bug.pos)
    ) {
      const isSelected = game.selected && game.selected.pos.eq(bug.pos)
      _drawQue.push(() => {
        drawOutline(pos, isSelected ? HUE_SELECTED : HUE_CLICKABLE)
      }, isSelected ? 1 : 0)
    }
  }

  function drawStone(x, y, r, color, gradStops) {
    hexPath(_ctx, x, y, r)
    const grad = _ctx.createLinearGradient(x-r, y-r, x+r, y+r);
    gradStops.forEach((color, i) => grad.addColorStop(i, color))

    _ctx.fillStyle = grad
    _ctx.fill()

    _ctx.lineWidth = 1
    _ctx.lineJoin = 'round'
    _ctx.strokeStyle = '#808080'

    _ctx.stroke()

    _ctx.beginPath()
    _ctx.moveTo(x, y+r)
    _ctx.arc(x, y, r*SQRT3_2-2, 0, Math.PI*2)
    _ctx.closePath()
    _ctx.fillStyle = color
    _ctx.fill()
  }


  function drawDot(pos, hue) {
    let r = S/6

    const {x, y} = hexToScreen(pos)
    hexPath(_ctx, x, y, r-3)
    const topBug = game.space.atTop(pos)
    if (!topBug) {
      _ctx.fillStyle = `hsla(${hue}, 80%, 50%, 1)`
    } else {
      if ((settings.get('color') === 'black') !== (topBug.color === 'white')) {
        _ctx.fillStyle = `hsla(${hue}, 80%, 100%, 1)`
      } else {
        _ctx.fillStyle = `hsla(${hue}, 80%, 0%, 1)`
      }
    }
    _ctx.fill()
  }

  function drawOutline(pos, hue) {
    if (_disabledPlayers.includes(game._activePlayerIndex)) {
      return
    }
    let r = S/2

    const dimm = hue === HUE_CLICKABLE && game.selected && !game.selected.pos.eq(pos.round())

    if (
      _target && pos.round().eq(_target) && game.isClickable(_target) || // hover
      game.selected && pos.round().eq(game.selected.pos) // selected
    ) {
      r *= 1.25
    }
    const {x, y} = hexToScreen(pos)
    _ctx.beginPath()
    hexPath(_ctx, x, y, r-3.5)
    _ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${dimm ? 0.20 : 1})`
    _ctx.lineWidth = 4
    _ctx.lineCap = 'round'
    _ctx.stroke()
  }


  function drawLoader(t, pos, player) {
    const isOffline = 'online' in player && !player.online
    const playerColor = settings.get('color') === 'black'
      ? player.color
      : inverted[player.color]
    t /= (isOffline ? 6000 : 2000)
    const showNames = _showNames || CNW > 900
    const a = (t%1 * Math.PI*4) - Math.PI/2
    const b = (t/2%1 * Math.PI*4) - Math.PI/2
    let {x, y} = hexToScreen(pos)

    const txtLim = 13
    const name = player.name.length <= txtLim
       ? player.name
       : player.name.substr(0, txtLim-1) + '…'

    _ctx.font = `normal ${Sf*4}px monospace`

    const txtW = _ctx.measureText(name).width
    const txtOfst = 8

    const s = S*SQRT3_2
    const r = s/3

    {
      const X = x - r -4
      const Y = y - r -4
      const W = r*2 +8 + (showNames ? txtW+txtOfst+12 : 0)
      const H = r*2 +8
      // clip to arc
      _ctx.save()
      _ctx.beginPath()
      _ctx.arc(x, y, r+5, 0, 2*Math.PI)
      _ctx.closePath()
      _ctx.clip()
      _ctx.clearRect(X, Y, W, H)
      drawBackground(true)
      // const { width, height } = _cachedBackground
      // _ctx.drawImage(_cachedBackground,
      //   Math.round((width-CNW)/2+X)-1, Math.round((height-CNH)/2+Y)-1, W+1, H+1,
      //   X-.5, Y-.5, W+1, H+1,
      // )
      _ctx.restore()
    }

    // background:
    {
      hexPath(_ctx, x, y, r - 1.5)
      _ctx.fillStyle = grayer[playerColor]
      _ctx.fill()
    }

    // rotating circle
    if (isOffline || (player === game.activePlayer() && game.state === 'started')) {
      _ctx.beginPath()
      _ctx.arc(x, y, r*SQRT2_3 +2, a, b, a<b)
      _ctx.strokeStyle = hsl((t*200)%360)(isOffline ? 0 : 75)(50)
      _ctx.lineCap = 'round'
      _ctx.lineWidth = 10
      _ctx.stroke()
    }

    // hex:
    {
      hexPath(_ctx, x, y, r - 0.5)
      _ctx.strokeStyle = base[playerColor]
      _ctx.lineCap = 'round'
      _ctx.lineWidth = 7
      _ctx.stroke()
    }

    if (!showNames) {
      return
    }

    x += txtOfst + r - 2
    if (isOffline) {
      x += 20
    }
    { // name label
      let r = s/2 - 12
      _ctx.beginPath()
      _ctx.moveTo(x-SQRT3_2*r,  y - SQRT2_3 * r*1.75)
      // _ctx.lineTo(x, y-r)
      // _ctx.lineTo(x+txtW, y-r)
      _ctx.lineTo(x+txtW+SQRT3_2*r+r/4, y - SQRT2_3 * r*1.75)
      _ctx.lineTo(x+txtW+SQRT3_2*r-r/4, y                )
      _ctx.lineTo(x+txtW+SQRT3_2*r+r/4, y + SQRT2_3 * r*1.75)
      // _ctx.lineTo(x+txtW, y+r)
      // _ctx.lineTo(x, y+r)
      _ctx.lineTo(x-SQRT3_2*r,  y + SQRT2_3 * r*1.75)
      _ctx.lineTo(x-SQRT3_2*r+r/2, y                )
      _ctx.closePath()
      _ctx.save()
      _ctx.clip()
      drawBackground(true)
      _ctx.fillStyle = base[playerColor]
      // _ctx.fillStyle = '#808080'
      _ctx.lineCap = 'round'
      _ctx.fill()
      _ctx.restore()
      // _ctx.stroke()
    }
    // name text:
    {
      _ctx.textBaseline = 'middle'
      _ctx.font = `bold ${Sf*4}px monospace`
      _ctx.fillStyle = '#808080'
      _ctx.fillText(name, x, y)
    }

  }


  function hexPath(ctx, x, y, r) {
    ctx.beginPath()
    ctx.moveTo(x, y-r)
    ctx.lineTo(x+SQRT3_2*r, y - SQRT2_3 * r)
    ctx.lineTo(x+SQRT3_2*r, y + SQRT2_3 * r)
    ctx.lineTo(x, y+r)
    ctx.lineTo(x-SQRT3_2*r,  y + SQRT2_3 * r)
    ctx.lineTo(x-SQRT3_2*r,  y - SQRT2_3 * r)
    ctx.closePath()
  }
}
