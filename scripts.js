/**
 * @author    Evan Young
 * @copyright Evan Young 2017
 * @file      An engine written for a browser
 */

/*
███    ███  ██████  ██████      ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
████  ████ ██    ██ ██   ██     ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
██ ████ ██ ██    ██ ██   ██     █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
██  ██  ██ ██    ██ ██   ██     ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
██      ██  ██████  ██████      ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
*/
// <region>
Location.prototype.query = (() => {
  let qs = document.location.search.split('+').join(' ')
  let re = /[?&]?([^=]+)=([^&]*)/g
  let params = {}
  let tokens
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  }
  return params
})()
/**
 * Limits an integer to a specific range
 * @param  {int} min The lower bound
 * @param  {int} max The upper bound
 * @return {int}     The number in range
 */
Number.prototype.clamp = function(min = 0, max = 1000000) {
  return Math.min(Math.max(this, min), max);
}
// </region>

/*
██████   ██████  ███    ███
██   ██ ██    ██ ████  ████
██████  ██    ██ ██ ████ ██
██   ██ ██    ██ ██  ██  ██
██   ██  ██████  ██      ██
*/
// <region>
const ROM = {
  author: 'Evan Young',
  copyright: 'Copyright (c) Evan Young 2017',
  version: '1.1.17',
  date: '12/14/2017',

  W: 320,
  H: 200,
  FPS: 30,

  PALETTE: {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    RED: '#880000',
    CYAN: '#AAFFEE',
    VIOLET: '#CC44CC',
    GREEN: '#00CC55',
    BLUE: '#0000AA',
    YELLOW: '#EEEE77',
    ORANGE: '#DD8855',
    BROWN: '#664400',
    LRED: '#FF7777',
    DGREY: '#333333',
    GREY: '#777777',
    LGREEN: '#AAFF66',
    LBLUE: '#0088FF',
    LGREY: '#BBBBBB'
  },

  Graphics: {
    Icon: function (ord, icon, color = ROM.PALETTE.BLACK, scale = 1, anc = 'tl', x = Math.ceil(ROM.W / 2), y = Math.ceil(ROM.H / 2)) {
      this.ord = ord
      this.icon = icon
      this.color = color
      this.scale = scale
      this.pos = {x: x, y: y + 0.5}

      switch (icon) {
        case 'que':
          switch (anc) {
            case 'cc':
              this.pos.x -= Math.ceil(7 / 2 * this.scale)
              this.pos.y -= Math.ceil(10 / 2 * this.scale)
          }

          this.draw = function () {
            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color
            ctx.lineWidth = this.scale

            ctx.fillRect(this.pos.x + 1 * this.scale, this.pos.y + 0.5, this.scale * 5, this.scale * 2)
            ctx.fillRect(this.pos.x, this.pos.y + 0.5 + 1 * this.scale, this.scale * 2, this.scale * 3)
            ctx.fillRect(this.pos.x + 5 * this.scale, this.pos.y + 0.5 + 1 * this.scale, this.scale * 2, this.scale * 4)
            ctx.fillRect(this.pos.x + 4 * this.scale, this.pos.y + 0.5 + 4 * this.scale, this.scale, this.scale)
            ctx.fillRect(this.pos.x + 3 * this.scale, this.pos.y + 0.5 + 5 * this.scale, this.scale * 2, this.scale * 2)
            ctx.fillRect(this.pos.x + 3 * this.scale, this.pos.y + 0.5 + 8 * this.scale, this.scale * 2, this.scale * 2)
          }
          break
        case 'floppy':
          switch (anc) {
            case 'cc':
              this.pos.x -= Math.ceil(27 / 2 * this.scale)
              this.pos.y -= Math.ceil(27 / 2 * this.scale)
          }

          this.draw = function () {
            let curx = this.pos.x + this.scale
            let cury = this.pos.y + (0.5 * ((this.scale + 1) % 2))
            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color
            ctx.lineWidth = this.scale
            ctx.beginPath()
            ctx.moveTo(curx, cury)


            curx += this.scale * 23
            ctx.lineTo(curx, cury)

            ctx.fillRect(curx, cury + 0.5 * this.scale, this.scale, this.scale)
            ctx.fillRect(curx + this.scale, cury + this.scale * 1.5, this.scale, this.scale)

            curx += this.scale * 3 - 0.5 * this.scale
            cury += this.scale * 3 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury += this.scale * 23
            ctx.lineTo(curx, cury)

            curx -= this.scale - 0.5 * this.scale
            cury += this.scale - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            curx -= (this.scale * 25)
            ctx.lineTo(curx, cury)

            curx -= this.scale - 0.5 * this.scale
            cury -= this.scale - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury -= this.scale * 25
            ctx.lineTo(curx, cury)

            curx += this.scale * 4
            cury += this.scale * 26
            ctx.moveTo(curx, cury)

            // Bottom Section
            cury -= this.scale * 12
            ctx.lineTo(curx, cury)

            curx += this.scale * 1 - 0.5 * this.scale
            cury -= this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            curx += this.scale * 17
            ctx.lineTo(curx, cury)

            curx += this.scale * 1 - 0.5 * this.scale
            cury += this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury += this.scale * 12
            ctx.lineTo(curx, cury)

            // Top Section
            curx = this.pos.x + this.scale * 7 - 0.5 * this.scale
            cury = this.pos.y + 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury += this.scale * 8
            ctx.lineTo(curx, cury)

            curx += this.scale * 1 - 0.5 * this.scale
            cury += this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            curx += this.scale * 13
            ctx.lineTo(curx, cury)

            curx += this.scale * 1 - 0.5 * this.scale
            cury -= this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury -= this.scale * 8
            ctx.lineTo(curx, cury)

            curx -= this.scale * 3
            cury += this.scale * 2
            ctx.moveTo(curx, cury)

            cury += this.scale * 4
            ctx.lineTo(curx, cury)

            curx -= this.scale * 1 - 0.5 * this.scale
            cury += this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            curx -= this.scale * 3
            ctx.lineTo(curx, cury)

            curx -= this.scale * 1 - 0.5 * this.scale
            cury -= this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            cury -= this.scale * 4
            ctx.lineTo(curx, cury)

            curx += this.scale * 1 - 0.5 * this.scale
            cury -= this.scale * 1 - 0.5 * this.scale
            ctx.moveTo(curx, cury)

            curx += this.scale * 3
            ctx.lineTo(curx, cury)


            ctx.stroke()
          }
          break
      }
    },

    Projectile: function (ord, color, dr, pos, motion, persist = false) {
      this.ord = ord
      this.color = color
      this.pos = pos
      this.draw = dr
      this.motion = motion
      this.persist = persist
    },
    Entity: function (ord, color, dr, pos = {x: Math.ceil(ROM.W/2), y: Math.ceil(ROM.H*0.8)}, data = {}) {
      this.ord = ord
      this.color = color
      this.pos = pos
      this.draw = dr

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key]
        }
      }
    },
    Layer: function (ord, dr) {
      this.ord = ord
      this.draw = dr
    },
    Border: function (ord, width = 4, color = ROM.PALETTE.WHITE) {
      this.width = width * 2
      this.color = color
      this.ord = ord

      this.draw = function () {
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.width
        ctx.strokeRect(0, 0, ROM.W, ROM.H)
      }
    }
  },

  keyPress: function (e) {
  },
  keyUp: function (e) {
    RAM.ctape += e.key.toLowerCase()
    if (e.code === 'KeyH' && e.altKey) {
      document.location.search = ''
    }

    if (RAM.keyUp !== undefined) {
      RAM.keyUp(e)
    }
  },
  keyDown: function (e) {
    if (RAM.keyDown !== undefined) {
      RAM.keyDown(e)
    }
  },

  loadCartridge: function () {
    if (document.location.query.loc === 'internal') {
      let sc = document.createElement('script')
      sc.src = `disc/${document.location.query.cart}.js`
      document.head.append(sc)
    }
  },
  registerCartridge: function () {
    document.title = `Redacted - ${RAM.cart.title}`
    if (RAM.tick !== undefined) {
      setInterval(RAM.tick, 1000/60)
    }

    setInterval(ROM.drawLayers, 1000/ROM.FPS)
  },

  drawLayers: function () {
    let dict = []
    for(var key in RAM.layers) {
      dict.push([key, RAM.layers[key].ord])
    }
    dict.sort(function (kv1, kv2) {return kv1[1] - kv2[1]})

    for (var kv of dict) {
      if (Array.isArray(RAM.layers[kv[0]])) {
        for (ly of RAM.layers[kv[0]]) {
          ly.draw()
        }
      } else {
        RAM.layers[kv[0]].draw()
      }
    }
  }
}
// </region>
Object.freeze(ROM)

/*
██████   █████  ███    ███
██   ██ ██   ██ ████  ████
██████  ███████ ██ ████ ██
██   ██ ██   ██ ██  ██  ██
██   ██ ██   ██ ██      ██
*/
// <region>
var RAM = {
  layers: {},
  cart: {},
  ctape: ''
}
// </region>

function bootSequence () {
  window.canvas = document.getElementById('mainCanvas')
  window.ctx = canvas.getContext('2d')
  window.ctx.imageSmoothingEnabled = false

  if (document.location.query.cart === undefined) {
    window.location.search = '?cart=disc&loc=internal'
  }
  ROM.loadCartridge()
}
document.onkeypress = ROM.keyPress
document.onkeyup = ROM.keyUp
document.onkeydown = ROM.keyDown
