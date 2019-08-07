// Everything what has something to do with producing visual output or handling user input is in this file

import { PriorityQueue, uncolorEmoji, rand } from './common.js'
import { Hex } from './board.js'
import { Queen } from './bugs.js';

export const hsl = (hue) => (sat) => (lig) => `hsl(${hue}, ${sat}%, ${lig}%)`; 

// returns new Ui class for given space
export default function uiOf(game) {
  const S = 64 // size of stone from point to point
  const CNW = 685
  const CNH = 685 + 67

  const HUE_CLICKABLE = 150
  const HUE_LANDING = HUE_CLICKABLE + 35

  const SQRT3_2 = Math.sqrt(3)/2
  const SQRT2_3 = Math.sqrt(2)/3

  const loaderPos = [
    new Hex(-9, 7),
    new Hex(-2, -7),
  ]

  const FPS = 60
  const skipFrame = {
    60: 1,
    30: 2,
    10: 6,
  }

  let _ctx
  let _canvas
  let _cacheCanvas
  let _frames = 0
  let _target = null
  let _drawQue = new PriorityQueue()

  let _invalidated = true
  let _showMenu = true
  let _showNames = false
  let _disabledPlayers = []

  let _beeRot = 0

  return new class Ui {
    constructor() {
    }
    on(canvas) {
      _canvas = canvas
      _ctx = setupCanvasHDPI(_canvas, CNW, CNH, { alpha: true })

      // prepare cached background
      if (!_cacheCanvas) {
        _cacheCanvas = document.createElement('canvas') // _canvas.cloneNode()
        // game.space.each((tile, hex) => drawTile(tile, hex))

        const ctx = setupCanvasHDPI(_cacheCanvas, CNW+S*2, CNH+S*SQRT3_2*2, { _willReadFrequently: true })

        // render background
        ctx.filter = "brightness(120%) contrast(20%) blur(2px)"
        ctx.translate(+S, +S*SQRT3_2)
        game.space.each((tile, hex) => drawTile(tile, hex, ctx))
      }

      canvas.addEventListener('mousemove', this.mouseMove)
      canvas.addEventListener('mousedown', this.mouseClick)
      document.addEventListener('keypress', this.keyPress)
      _invalidated = true
      this.startRenderLoop()
      return this
    }

    off(canvas) {
      this.stopRenderLoop()
      canvas = canvas || _canvas
      canvas.removeEventListener('mousemove', this.mouseMove)
      canvas.removeEventListener('mousedown', this.mouseClick)
      document.removeEventListener('keypress', this.keyPress)
      return this
    }

    disableInputFor(playerIndexes) {
      _disabledPlayers = playerIndexes
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

    mouseClick(event) {
      if (_showMenu) {
        game.menu.forEach(({pos, action}, i) => {
          action && eventToHexExact(event).distance(pos) <= 1 && action()
        })
        return
      }
      game.backButton.action
        && eventToHexExact(event).distance(game.backButton.pos) <= .5
        && game.backButton.action()

      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }
      game.onClick(eventToHex(event))
      _invalidated = true
    }

    mouseMove(event) {
      _canvas.style.cursor = 'default'
      if (_showMenu) {
        game.menu.forEach(({pos, action}, i) => {
          if (game.menu[i].active = action && eventToHexExact(event).distance(pos) <= 1) {
            _canvas.style.cursor = 'pointer'
          }
        })
        _invalidated = true
        return
      }

      if (_showNames = loaderPos.some(pos => pos.eq(eventToHex(event)))) {
        _invalidated = true
        return
      }
      if (game.backButton.active = eventToHexExact(event).distance(game.backButton.pos) <= .5) {
        _canvas.style.cursor = 'pointer'
        _invalidated = true
        return 
      }

      let target = eventToHex(event)
      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }
      if (game.isClickable(target)) {
        _canvas.style.cursor = 'pointer'
        // store last hovered tile pos
        _target = target
      } else {
        _canvas.style.cursor = 'default'
        _target = null
      }
      _invalidated = true
    }

    keyPress(event) {
      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }

      const handBug = game.activePlayer().hand.findBug((bug) =>
        bug.name[0].toLowerCase() === event.key
      )
      _invalidated = true
      if (handBug) {
        return game.onClick(handBug.pos)
      }

      const spaceBug = game.space.findBug((bug) =>
        bug.name[0].toLowerCase() === event.key &&
          bug.color === game.activePlayer().color &&
          bug !== game.selected &&
          !game.space.isHiveBridge(bug.pos)
      )
      if (spaceBug) {
        return game.onClick(spaceBug.pos)
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
      if (_frames++ % skipFrame[FPS] === 0)
        this.redraw(t)
      if (!this.stop)
        requestAnimationFrame(this.onFrame.bind(this))
    }

    redraw(t) {
      if (_showMenu) {
        if (_invalidated) {
          drawBackground()
          drawMenu()
          _invalidated = false
        }
        return
      }

      let [offsetX, offsetY] = [0, 0] 

      if (_invalidated || this._oneMoreFrame) {
        let someAnimating = false

        // DRAW SPACE

        // animate space shift
        if (game.space.animation) {
          const { dest, since } = game.space.animation
          const duration = 400
          const sofar = Date.now() - since

          const progress = sofar / duration
          const {x, y} = hexToScreen(dest.scale(1-progress))

          if (progress > 1) { // destination reached
            game.space.animation = null
          } else {
            someAnimating = true
            offsetX = x-CNW/2
            offsetY = y-CNH/2
          }
        }

        _ctx.translate(offsetX, offsetY)

        // background
        drawBackground()

        // bugs
        game.space.each((tile, hex) => {
          someAnimating = drawBugsOftile(tile, hex, t) || someAnimating
        })

        if (someAnimating) {
          game.disableInput()
        } else {
          game.enableInput()
        }

        // outlines (selected, path, and landings)
        if (game.selected) {
          drawOutline(game.selected.pos, HUE_CLICKABLE)
          game.landings.forEach(pos => {
            _drawQue.push(() => {
              drawOutline(pos, HUE_LANDING)
            })
          })
          _target && game.selected && (game.selected.pathTo(game.space, _target) || []).forEach((pos, i) => {
            i > 0 && _drawQue.push(() => drawDot(pos, HUE_LANDING), 3)
          })
        }

        if (game.message) {
          _drawQue.push(() => {
            const {x, y} = hexToScreen(new Hex(0, 0))
            _ctx.font = "normal 52px monospace"
            const w = _ctx.measureText(game.message).width
            _ctx.fillStyle = '#eee'
            _ctx.fillText(game.message, x-w/2 -.5, y -.5)
            _ctx.fillStyle = '#111'
            _ctx.fillText(game.message, x-w/2 +.5, y +.5)
            _ctx.fillStyle = '#888'
            _ctx.fillText(game.message, x-w/2,     y   )
          }, 10)
        }

        // end
        _invalidated = someAnimating || false
        if (!_invalidated && !this._oneMoreFrame) {
          this._oneMoreFrame = true
        } else {
          this._oneMoreFrame = false
        }

        // call deffered drawing stuff for board
        while(_drawQue.len() > 0) {
          _drawQue.pop()()
        }

        _ctx.translate(-offsetX, -offsetY)

      
        // DRAW GUI
        game.players.forEach(({hand}) => hand.each(b => drawBug(b, undefined, true, t)))

        drawBackButton(game.backButton)

        // call deffered drawing stuff for gui
        while(_drawQue.len() > 0) {
          _drawQue.pop()()
        }
  
      }

      // render always:
      // if (game.space.midpoint) {
      //   drawDot(game.space.midpoint, 0)
      // }

      if (game.state !== 'end') {
        drawLoader(t, loaderPos[0], game.players[0])
        drawLoader(t, loaderPos[1], game.players[1])
      }
    }
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

  function drawBackground() {
    _ctx.clearRect(0, 0, CNW, CNH)
    _ctx.drawImage(_cacheCanvas,
      -S, -S*SQRT3_2, CNW+S*2, CNH+S*SQRT3_2*2,
    )
  }

  function drawBackButton({pos, label, active}) {
    const textColor = '#6669'
    const base = hsl(-10)
    const bkg = base(active ? 65 : 0)
    const {x, y} = hexToScreen(pos)
    drawStone(x, y, S/2, bkg(50), [bkg(80), bkg(20)])
    //outline
    hexPath(_ctx, x, y, S/2-1)
    _ctx.strokeStyle = bkg(40)
    _ctx.lineWidth = 2
    _ctx.lineCap = 'round'
    _ctx.lineJoin = 'round'
    _ctx.stroke()
    // text
    _ctx.font = 'normal bold 36px emoji-symbols'
    const w = _ctx.measureText(label).width
    _ctx.fillStyle = bkg(80)
    _ctx.fillText(uncolorEmoji(label), x-8+.5, y+4+.5)
    _ctx.fillStyle = bkg(20)
    _ctx.fillText(uncolorEmoji(label), x-8-.5, y+4-.5)
    _ctx.fillStyle = textColor
    _ctx.fillText(uncolorEmoji(label), x-8,    y+4   )
  }

  function drawMenu() {
    const textColor =  '#6669'
    game.menu.forEach(({pos, label, title, action, active}, i) => {
      const base = hsl(-60*(i+5.75)) // set hue
      const bkg = base(active ? 80 : 50) // set saturation
      _ctx.filter = action ? 'none' : 'brightness(150%) grayscale(95%) opacity(30%)'

      const {x, y} = hexToScreen(pos)

      drawStone(x, y, S, bkg(50), [bkg(80), bkg(20)]) // set lightness

      // outline
      hexPath(_ctx, x, y, S-2)
      _ctx.strokeStyle = bkg(40)
      _ctx.lineWidth = 4
      _ctx.lineCap = 'round'
      _ctx.lineJoin = 'round'
      _ctx.stroke()

      // label icons
      _ctx.font = 'normal bold 36px emoji-symbols'
      const w = _ctx.measureText(label).width
      _ctx.fillStyle = bkg(80)
      _ctx.fillText(uncolorEmoji(label), x-w/2+.5, y+12+.5)
      _ctx.fillStyle = bkg(20)
      _ctx.fillText(uncolorEmoji(label), x-w/2-.5, y+12-.5)
      _ctx.fillStyle = textColor
      _ctx.fillText(uncolorEmoji(label), x-w/2, y+12)

      if (active) {
        _ctx.font = 'normal 20px monospace'
        const w = _ctx.measureText(title).width
        const {x, y} = hexToScreen(new Hex(0, 0))
        _ctx.filter = 'none'
        _ctx.fillStyle = bkg(20)
        _ctx.fillText(title, x-w/2+1, y+4+1)
        _ctx.fillStyle = bkg(80)
        _ctx.fillText(title, x-w/2-1, y+4-1)
        _ctx.fillStyle = bkg(50)
        _ctx.fillText(title, x-w/2, y+4)
      }
    })
    // bee
    if (game.menu.every(({ active }) => !active)) {
      const bee = new Queen()
      const w = _ctx.measureText(bee.symbol).width
      const {x, y} = hexToScreen(new Hex(0, 0))

      doRatated(x, y, _beeRot, (xo, yo) => {
        const clr = hsl(bee.hue)(0)
        _ctx.font = 'normal 75px emoji-symbols'
        // _ctx.fillStyle = clr(40)
        // _ctx.fillText(bee.symbol, x-w+.5*xo, y+25+.5*yo)
        // _ctx.fillStyle = clr(80)
        // _ctx.fillText(bee.symbol, x-w-.5*xo, y+25-.5*yo)
        _ctx.fillStyle = clr(60)
        _ctx.fillText(bee.symbol, x-w, y+25)
      })

      _beeRot += (11-rand(23)) * 2
      _beeRot %= 360
    }
  }

  function doRatated(x, y, angle, func) {
    const a = (Math.PI/180) * angle
    _ctx.translate(x, y)
    _ctx.rotate(a)
    _ctx.translate(-x, -y)
    typeof func === 'function' && func(Math.sin(a), Math.cos(a))
    _ctx.translate(x, y)
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

  function eventToHex({offsetX: x, offsetY: y}) {
    return screenToHex({x, y}).round()
  }

  function eventToHexExact({offsetX: x, offsetY: y}) {
    return screenToHex({x, y})
  }

  function drawTile(tile, hex, ctx) {
    ctx = ctx || _ctx
    const {x, y} = hexToScreen(hex)

    const delta = hex.distance(new Hex(0,0))
    const cube = hex.toCube()
    const [r,g,b] = [cube.x * 45, cube.z * 45, cube.y * 45]

    ctx.strokeStyle = ctx.fillStyle = `rgba(${r},${g},${b},${0.2 + 0.1*delta})`
    ctx.lineWidth = 2
    hexPath(ctx, x, y, S/2)
    ctx.fill()
    ctx.stroke()
  }

  function drawBugsOftile(tile, hex, t) {
    let someAnimating = false
    const offset = new Hex(+0.0, -0.2)
    tile.forEach((bug, i) => {
      let drawPos = bug.pos.add(offset.scale(i))
      const isTop = i === tile.length - 1

      if (bug.animation) { // drawing
        const  { ms, path, since, ease } = bug.animation
        const sofar = Date.now() - since
        const jumps = path.length-1
        const duration = ms*jumps * 1

        if (sofar > duration) { // destination reached
          bug.animation = null
        } else {
          someAnimating = true

          // compute drawPos position during animation
          const t = ease(Math.min(sofar/duration), 1)
          const i = Math.floor(t * jumps) // path segment index
          const diff = (i >= jumps)
            ? console.error('index jumped outof path') || new Hex(0,0) // this should not happen?
            : path[i+1].sub(path[i])
          const tSeg = (t * duration % ms)/ms // 0-1
          drawPos = path[i].add(diff.scale(tSeg))
        }
      }

      const draw = () => drawBug(bug, drawPos, isTop, t)

      const isMoving = Boolean(bug.animation)
      let prio = 0 + // most bugs are grounded
        +(i > 0) + // higher elevation on top
        +isMoving // animating draw even higher

      _drawQue.push(draw, prio)
    })

    return someAnimating
  }

  function drawBug(bug, pos, isTop, t=0) {
    let r = S/2

    if (!pos) { // hand bug
      pos = bug.pos
      // r *= 1.25
    }

    let {x, y} = hexToScreen(pos)

    const highlighted = _target && _target.eq(bug.pos) && game.isClickable(_target) && isTop || game.selected === bug || bug.animation
    if (highlighted) {
      r *= 1.25
    }

    drawStone(x, y, r, bug.color, [
      bug.color === game.players[1].color ? '#fff' : '#666',
      bug.color === game.players[1].color ? '#999' : '#000',
    ])

    { // text
      const txt = bug.symbol
      _ctx.textBaseline = 'middle'
      _ctx.font = `normal ${highlighted ? 50 : 40}px emoji-symbols`
      const w = _ctx.measureText(txt).width
      _ctx.fillStyle = bug.hue !== undefined ? `hsla(${bug.hue}, ${highlighted ? 60 : 40}%, 50%, 1)` : '#808080'
      doRatated(x, y, bug.shiver(t), () => {
        _ctx.fillText(txt, x-w/2, y+2)
      })
    }

    if (
      isTop &&
      game.isClickable(bug.pos)
    ) {
      _drawQue.push(() => drawOutline(pos, HUE_CLICKABLE), 0)
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
    hexPath(_ctx, x, y, r-2)
    _ctx.strokeStyle = `hsla(${hue}, 80%, 50%, 1)`
    _ctx.lineWidth = 2
    _ctx.lineCap = 'round'
    _ctx.stroke()
  }

  function drawOutline(pos, hue) {
    if (_disabledPlayers.includes(game._activePlayerIndex)) {
      return
    }
    let r = S/2

    const dimm =  hue === HUE_CLICKABLE && game.selected && !game.selected.pos.eq(pos.round())

    if (
      _target && pos.round().eq(_target) && game.isClickable(_target) || // hover
      game.selected && pos.round().eq(game.selected.pos) // selected
    ) {
      r *= 1.25
    }
    const {x, y} = hexToScreen(pos)
    _ctx.beginPath()
    hexPath(_ctx, x, y, r-3.5)
    _ctx.strokeStyle = `hsla(${hue}, 80%, 50%, ${dimm ? 0.25 : 1})`
    _ctx.lineWidth = 4
    _ctx.lineCap = 'round'
    _ctx.stroke()
  }


  function drawLoader(t, pos, player) {
    t /= 2000
    const a = (t%1 * Math.PI*4) - Math.PI/2
    const b = (t/2%1 * Math.PI*4) - Math.PI/2
    let {x, y} = hexToScreen(pos)

    const txtLim = 10
    const name = player.name.length <= txtLim
       ? player.name
       : player.name.substr(0, txtLim-1) + '…'

    _ctx.font = 'normal 16px monospace'

    const txtW = _ctx.measureText(name).width
    const txtOfst = 8

    const s = S*SQRT3_2
    const r = s/3


    let angle = pos.r < 0 ? 60 : -60
    if (!player.hand._hand[0]) {
      angle /=2
      if (!player.hand._hand[1]) {
        angle = 0
      }
    }

    {
      const X = x - r -3
      const Y = y - r -3
      const W = r*2 +6 + (_showNames ? txtW+txtOfst+12 : 0)
      const H = r*2 +6
      doRatated(x, y, _showNames ? angle : 0, () => {
        // _ctx.clearRect(X, Y, W, H)
        _ctx.drawImage(_cacheCanvas,
          X+S, Y+S*SQRT3_2, W, H,
          X, Y, W, H,
        )
      })
    }

    // rotating circle
    if (player === game.activePlayer()) {
      _ctx.beginPath()
      _ctx.arc(x, y, r*SQRT2_3 +2, a, b, a<b)
      _ctx.strokeStyle = hsl((t*200)%360)(75)(50)
      _ctx.lineCap = 'round'
      _ctx.lineWidth = 10
      _ctx.stroke()
    }

    // hex:
    {
      hexPath(_ctx, x, y, r - 0.5)
      _ctx.strokeStyle = player.color
      _ctx.lineCap = 'round'
      _ctx.lineWidth = 7
      _ctx.stroke()

      hexPath(_ctx, x, y, r + 2.5)
      _ctx.strokeStyle = '#808080'
      _ctx.lineCap = 'round'
      _ctx.lineWidth = 1
      // _ctx.stroke()

    }


    if (!_showNames) {
      return
    }

    doRatated(x, y, angle, () => {
      x += txtOfst + r
      { // name label
        let r = s/2 - 12
        _ctx.beginPath()
        // _ctx.moveTo(x, y-r)
        _ctx.lineTo(x+txtW, y-r)
        _ctx.lineTo(x+SQRT3_2*r+txtW, y - SQRT2_3 * r)
        // _ctx.lineTo(x+SQRT3_2*r+txtW-r/2, y                )
        _ctx.lineTo(x+SQRT3_2*r+txtW, y + SQRT2_3 * r)
        _ctx.lineTo(x+txtW, y+r)
        // _ctx.lineTo(x, y+r)
        _ctx.lineTo(x-SQRT3_2*r,  y + SQRT2_3 * r*1.5)
        _ctx.lineTo(x-SQRT3_2*r,  y - SQRT2_3 * r*1.5)
        _ctx.closePath()
        _ctx.fillStyle = player.color
        // _ctx.fillStyle = '#808080'
        _ctx.lineCap = 'round'
        _ctx.fill()
        // _ctx.stroke()
      }
      // name text:
      {
        _ctx.textBaseline = 'middle'
        _ctx.font = 'bold 15px monospace'
        _ctx.fillStyle = '#808080'
        _ctx.fillText(name, x, y)
      }
    })

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
