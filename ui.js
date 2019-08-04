// Everything what has something to do with producing visual output or handling user input is in this file

import { PriorityQueue, uncolorEmoji } from './common.js'
import { Hex } from './board.js'


// returns new Ui class for given space
export default function uiOf(game) {
  const S = 64 // size of stone from point to point
  const CNW = 685
  const CNH = 685 + 67

  const HUE_CLICKABLE = 150
  const HUE_LANDING = HUE_CLICKABLE + 35

  const SQRT3_2 = Math.sqrt(3)/2
  const SQRT2_3 = Math.sqrt(2)/3

  let _ctx
  let _canvas
  let _cacheCanvas
  let _cacheCtx
  let _frames = 0
  let _target = null
  let _drawQue = new PriorityQueue()

  let _invalidated = true
  let _showMenu = true
  let _disabledPlayers = []

  return new class Ui {
    constructor() {
    }
    on(canvas) {
      _canvas = canvas
      _ctx = setupCanvasHDPI(_canvas, CNW, CNH, { alpha: true })

      _cacheCanvas = document.createElement('canvas') // _canvas.cloneNode()
      // game.space.each((tile, hex) => drawTile(tile, hex))

      _cacheCanvas.with = _canvas.with
      _cacheCanvas.height = _canvas.height
      _cacheCtx = setupCanvasHDPI(_cacheCanvas, CNW, CNH, { _willReadFrequently: true })

      // prepare background
      _cacheCtx.filter = "brightness(120%) contrast(20%) blur(2px)"
      game.space.each((tile, hex) => drawTile(tile, hex, _cacheCtx))

      canvas.addEventListener('mousemove', this.mouseMove)
      canvas.addEventListener('mousedown', this.mouseClick)
      document.addEventListener('keypress', this.keyPress)
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
      return this
    }

    hideMenu() {
      _showMenu = false
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
      if (_disabledPlayers.includes(game._activePlayerIndex)) {
        return
      }
      game.onClick(eventToHex(event))
      _invalidated = true
    }

    mouseMove(event) {
      if (_showMenu) {
        _canvas.style.cursor = 'default'
        game.menu.forEach(({pos, action}, i) => {
          if (game.menu[i].active = action && eventToHexExact(event).distance(pos) <= 1) {
          _canvas.style.cursor = 'pointer'
          }
        })
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
      if (_frames++ % 2 === 0) // 30fps
        this.redraw(t)
      if (!this.stop)
        requestAnimationFrame(this.onFrame.bind(this))
    }

    redraw(t) {
      if (_showMenu) {
        drawBackground()
        drawMenu()
        return
      }

      if (_invalidated || this._oneMoreFrame) {
        // background
        drawBackground()

        let someAnimating = false
        // bugs
        game.space.each((tile, hex) => {
          someAnimating = drawBugsOftile(tile, hex) || someAnimating
        })
        game.players.forEach(({hand}) => hand.each(b => drawBug(b, undefined, true)))

        if (someAnimating) {
          game.disableInput()
        } else {
          game.enableInput()
        }

        // outlines (selected, path, and landings)
        if (game.selected) {
          drawOutline(game.selected.pos, HUE_CLICKABLE)
          game.landings.forEach(pos => {
            drawOutline(pos, HUE_LANDING)
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
            _ctx.fillText(game.message, x-w/2 -1, y -1)
            _ctx.filter = "blur(2px)"
            _ctx.fillText(game.message, x-w/2 -1, y -1)
            _ctx.fillStyle = '#111'
            _ctx.fillText(game.message, x-w/2 +2, y +2)
            _ctx.filter = "blur(4px)"
            _ctx.fillText(game.message, x-w/2 +2, y +2)
            _ctx.fillStyle = '#5ef'
            _ctx.filter = "none"
            _ctx.fillText(game.message, x-w/2,     y   )
          }, 10)
        }

        // end
        _invalidated = someAnimating || false
        if (!_invalidated && !this._oneMoreFrame) {
          // animation just ended
          this._oneMoreFrame = true
          _target = null 
        } else {
          this._oneMoreFrame = false
        }
      }


      // render always:
      let p1 = new Hex(-10, 5)
      let p2 = p1.rotate(-1)
      drawLoader(t, p1, game.players[0])
      drawLoader(t, p2, game.players[1])

      // call deffered drawing stuff
      while(_drawQue.len() > 0) {
        _drawQue.pop()()
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

    let ctx = canvas.getContext('2d', options);
    ctx.scale(ratio, ratio)
    return ctx
  }

  function drawBackground() {
    _ctx.clearRect(0, 0, CNW, CNH)
    _ctx.drawImage(_cacheCanvas, 0, 0, CNW, CNH)
  }

  function drawMenu() {
    const color =  '#776'
    const colorH = '#665'
    const background = '#eb06'
    const backgroundH = '#eb0a'

    game.menu.forEach(({pos, label, action, active}) => {
      _ctx.filter = action ? 'none' : 'brightness(130%) grayscale(90%)'

      const {x, y} = hexToScreen(pos)
      hexPath(_ctx, x, y, S)
      _ctx.fillStyle = active ? backgroundH : background
      _ctx.strokeStyle = active ? colorH : color
      _ctx.lineWidth = 8
      _ctx.lineCap = 'round'
      _ctx.lineJoin = 'round'
      _ctx.fill()
      _ctx.stroke()

      const w = _ctx.measureText(label).width
      _ctx.fillStyle = active ? colorH : color
      _ctx.font = 'normal 36px monospace'
      _ctx.fillText(uncolorEmoji(label), x-w/2, y+12)
      _ctx.filter = 'none'
    })
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

  function drawBugsOftile(tile, hex) {
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

      const draw = () => drawBug(bug, drawPos, isTop)

      const isMoving = Boolean(bug.animation)
      let prio = 0 + // most bugs are grounded
        +(i > 0) + // higher elevation on top
        +isMoving // animating draw even higher

      _drawQue.push(draw, prio)
    })

    return someAnimating
  }

  function drawBug(bug, pos=bug.pos, isTop) {
    let {x, y} = hexToScreen(pos)

    let r = S/2

    const highlighted = _target && _target.eq(bug.pos) && isTop || game.selected === bug || bug.animation
    if (highlighted) {
      r *= 1.25
    }


    { // stone
      hexPath(_ctx, x, y, r)
      let grad = _ctx.createLinearGradient(x-r, y-r, x+r, y+r);
      grad.addColorStop(0, bug.color === game.players[1].color ? '#fff' : '#666');
      grad.addColorStop(1, bug.color === game.players[1].color ? '#999' : '#000');

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
      _ctx.fillStyle = bug.color
      if (highlighted) {
        _ctx.fillStyle = '#808080'
      }
      _ctx.fill()

    }

    { // text
      const txt = bug.symbol
      _ctx.textBaseline = 'middle'
      _ctx.font = 'normal 40px monospace'
      const w = _ctx.measureText(txt).width
      if (!highlighted) {
        _ctx.filter = 'contrast(0%)'
      }
      _ctx.fillStyle = '#808080'
      _ctx.fillText(txt, x-w/2, y)
      _ctx.filter = 'none'
    }

    if (
      isTop &&
      game.isClickable(bug.pos)
    ) {
      _drawQue.push(() => drawOutline(pos, HUE_CLICKABLE), 0)
    }
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
    const txtOfst = 6

    const s = S*SQRT3_2
    const r = s/3
    x += s*2
    _ctx.clearRect(x - r -4, y - r -4, r*2 + txtW+txtOfst+ 8, r*2 +8)

    // circle
    if (player === game.activePlayer()) {
      _ctx.beginPath()
      _ctx.arc(x, y, r*SQRT2_3 +2, a, b, a<b)
      _ctx.strokeStyle = `hsla(${(t*200)%360}, 25%, 50%, 1)`
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
      _ctx.stroke()

      x += txtOfst + r
      // { // name label
      //   let r = s/2 - 12
      //   _ctx.beginPath()
      //   _ctx.moveTo(x, y-r)
      //   _ctx.lineTo(x+txtW, y-r)
      //   _ctx.lineTo(x+SQRT3_2*r+txtW, y - SQRT2_3 * r)
      //   _ctx.lineTo(x+SQRT3_2*r+txtW, y + SQRT2_3 * r)
      //   _ctx.lineTo(x+txtW, y+r)
      //   _ctx.lineTo(x, y+r)
      //   _ctx.lineTo(x-SQRT3_2*r,  y + SQRT2_3 * r)
      //   _ctx.lineTo(x-SQRT3_2*r,  y - SQRT2_3 * r)
      //   _ctx.closePath()
      //   _ctx.fillStyle = player.color
      //   // _ctx.fillStyle = '#808080'
      //   _ctx.lineCap = 'round'
      //   _ctx.fill()
      //   _ctx.stroke()
      // }
    }
    // name text:
    {
      _ctx.textBaseline = 'middle'
      _ctx.font = 'bold 15px monospace'
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
