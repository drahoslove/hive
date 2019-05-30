// Everything what has something to do with producing visual output or handling user input is in this file

// returns new Ui class for given space
function uiOf(game) {
  const S = 64 // size of stone from point to point
  const CNS = 685
  let _ctx
  let _canvas
  let _cacheCanvas
  let _cacheCtx
  let _frames = 0
  let _target = null


  return new class Ui {
    async on(canvas) {
      _canvas = canvas
      _ctx = setupCanvasHDPI(_canvas, CNS, CNS, { alpha: false })

      _cacheCanvas = document.createElement('canvas') // _canvas.cloneNode()
      game.space.each((tile, hex) => drawTile(tile, hex))

      _cacheCanvas.with = _canvas.with
      _cacheCanvas.height = _canvas.height
      _cacheCtx = setupCanvasHDPI(_cacheCanvas, CNS, CNS, { _willReadFrequently: true })

      // prepare background
      _cacheCtx.filter = "brightness(120%) contrast(20%) blur(2px)"
      game.space.each((tile, hex) => drawTile(tile, hex, _cacheCtx))

      _canvas.addEventListener('mousemove', this.mouseMove)
      _canvas.addEventListener('mousedown', this.mouseClick)
      canvas.addEventListener('mouseup', this.mouseClick)
      this.startAnimation()
      return this
    }

    off(canvas) {
      this.stopAnimation()
      canvas = canvas || _canvas
      canvas.removeEventListener('mousemove', this.mouseMove)
      canvas.removeEventListener('mousedown', this.mouseClick)
      canvas.removeEventListener('mouseup', this.mouseClick)
      return this
    }

    mouseClick = (event) => {
      game.onClick(eventToHex(event))
    }

    mouseMove = (event) => {
      let target = eventToHex(event)
      if(game.isClickable(target)) {
        _canvas.style.cursor = 'pointer'
      } else {
        _canvas.style.cursor = 'default'
      }
      // store last hovered tile pos
      if (_target != target) {
        _target = target
        game.invalidated = true
      }
    }

    startAnimation() {
      this.stop = false
      game.invalidated = true
			requestAnimationFrame(this.onFrame)
		}

    stopAnimation() {
      this.stop = true
    }

    onFrame = (t) => {
      if (_frames++ % 1 === 0) // 30fps
        this.redraw(t)
      if (!this.stop)
        requestAnimationFrame(this.onFrame)
    }

    redraw(t) {
      if (game.invalidated || game.space.animating || this._oneMoreFrame) {
        // backgrond
        drawBackground()

        // bugs
        game.space.each(drawBugsOftile)
        game.players.forEach(({hand}) => hand.each(b => drawBug(b)))
        // _target && game.activePlayer().hand.each(b => {
        //   if(b && b.pos.eq(_target)) {
        //     drawBug(b)
        //   }
        // })

        // outlines
        game.space.articulations().forEach(pos => {
          drawOutlined(pos, '#ba3')
        })
        if(game.selected) {
          drawOutlined(game.selected.pos, '#b3a')
          game.landings.forEach(pos => {
            drawOutlined(pos, '#3ba')
          })
          _target &&  (game.space.findPath(game.selected.pos, _target) || []).forEach(pos => {
            drawOutlined(pos, '#b3a')
          })
        }

        // end
        if (this._oneMoreFrame) {
          this._oneMoreFrame = false
        }
        game.invalidated = false
      }
      // render always:
      let p = new Hex(-9, 7)
      drawLoader(t, game._activePlayerIndex == 0 ? p : p.revert())

      if (game.invalidated || game.space.animating) {
        this._oneMoreFrame = true
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
    _ctx.clearRect(0, 0, CNS, CNS)
    _ctx.drawImage(_cacheCanvas, 0, 0, CNS, CNS)
  }


  function hexToScreen({q, r}) {
    // let x = S/2 * (           3/2 * q                   )
    // let y = S/2 * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r)
    let x = S/2 * (Math.sqrt(3) * q + Math.sqrt(3)/2 * r)
    let y = S/2 * (                              3/2 * r)
    x += CNS/2
    y += CNS/2
    return {x, y}
  }

  function screenToHex({x, y}) {
    x -= CNS/2
    y -= CNS/2
    // let q = ( 2/3 * x                     ) / (S/2)
    // let r = (-1/3 * x + Math.sqrt(3)/3 * y) / (S/2)
    let q = (Math.sqrt(3)/3 * x - 1/3 * y) / (S/2)
    let r = (                     2/3 * y) / (S/2)
    return new Hex(q, r)
  }

  function eventToHex({offsetX: x, offsetY: y}) {
    return screenToHex({x, y}).round()
  }

  function drawTile(tile, hex, ctx) {
    ctx = ctx || _ctx
    const {x, y} = hexToScreen(hex)

    const delta = hex.distance(new Hex(0,0))
    const cube = hex.toCube()
    const [r,g,b] = [cube.x * 45, cube.z * 45, cube.y * 45]

    ctx.strokeStyle = ctx.fillStyle = `rgba(${r},${g},${b},${0.2 + 0.1*delta})`
    ctx.lineWidth = 2
    ctx.beginPath()
    hexPath(ctx, x, y, S/2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  function drawBugsOftile(tile, hex) {
    const offset = new Hex(+0.0, -0.2)
    tile.forEach((b, i) =>
      drawBug(b, b.pos.add(offset.scale(i)))
    )
  }

  function drawBug(bug, pos) {
    let {x, y} = hexToScreen(pos || bug.pos)

    let r = S/2

    if (
      _target && bug.pos.eq(_target) && game.isClickable(_target) ||
      game.selected && bug.pos.eq(game.selected.pos)
    ) {
      r *= 1.25
    }

    { // stone
      _ctx.beginPath()
      hexPath(_ctx, x, y, r)
      _ctx.fillStyle = bug.color
      _ctx.strokeStyle = '#888'
      _ctx.lineWidth = 2
      _ctx.lineJoin = 'round'
      _ctx.fill()
      _ctx.stroke()
    }

    { // text
      const txt = bug.constructor.name.substr(0,6)
      _ctx.textBaseline = 'middle'
      _ctx.font = 'normal 16px monospace'
      if (bug.name === "Queen") {
        _ctx.font = 'bold 18px monospace'
        _ctx.fontWeigh = "bold"
      }
      const w = _ctx.measureText(txt).width
      _ctx.fillStyle = '#888'
      _ctx.fillText(txt, x-w/2, y)
    }
  }

  function drawOutlined(pos, style) {
    let r = S/2

    if (
      game.selected && pos.eq(game.selected.pos)
    ) {
      r *= 1.25
    }
    const {x, y} = hexToScreen(pos)
    _ctx.beginPath()
    hexPath(_ctx, x, y, r-2.5)
    _ctx.strokeStyle = style
    _ctx.lineWidth = 5
    _ctx.lineCap = 'round'
    _ctx.setLineDash([4, 8]);
    _ctx.stroke()
    _ctx.setLineDash([]);

  }

  function drawLoader(t, pos) {
    t /= 4000
    const a = (t%1 * Math.PI*4) - Math.PI/2
    const b = (t/2%1 * Math.PI*4) - Math.PI/2
    const {x, y} = hexToScreen(pos)
    s = S/1.618
    _ctx.clearRect(x-s/2, y-s/2, s, s)
    _ctx.beginPath()
    _ctx.arc(x, y, S/5, a, b, a<b)
    _ctx.strokeStyle = '#888'
    _ctx.lineCap = 'round'
    _ctx.lineWidth = 12
    _ctx.stroke()

    hexPath(_ctx, x, y, s/4)
    _ctx.fillStyle = game.activePlayer().color
    _ctx.lineCap = 'round'
    _ctx.fill()
  }

  function hexPath(ctx, x, y, r) {
    ctx.beginPath()
    ctx.moveTo(x, y-r)
    ctx.lineTo(x+Math.sqrt(3)/2*r, y - Math.sqrt(2)/3 * r)
    ctx.lineTo(x+Math.sqrt(3)/2*r, y + Math.sqrt(2)/3 * r)
    ctx.lineTo(x, y+r)
    ctx.lineTo(x-Math.sqrt(3)/2*r,  y + Math.sqrt(2)/3 * r)
    ctx.lineTo(x-Math.sqrt(3)/2*r,  y - Math.sqrt(2)/3 * r)
    ctx.closePath()
  }
}