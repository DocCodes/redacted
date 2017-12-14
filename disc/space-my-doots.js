RAM.cart = {
  title: 'Space My Doots',
  author: 'Evan Young',
  copyright: 'Copyright (c) Evan Young 2017',
  version: '1.0.0',
  date: '12/12/2017'
}
RAM.austin = function () {
  RAM.layers.player.color = ROM.PALETTE.RED
  RAM.layers.player.draw = function () {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, Math.ceil(this.size / 2), 0, 2 * Math.PI)
    ctx.fill()
  }
}

RAM.stars = (() => {
  let li = []
  for (i = 0; i < 40; i++)   {
    li.push([Math.random(), Math.random()])
  }
  return li
})()
RAM.layers = {
  background: new ROM.Graphics.Layer(0, function () {
    ctx.fillStyle = ROM.PALETTE.BLACK
    ctx.fillRect(0, 0, ROM.W, ROM.H)
  }),
  stars: new ROM.Graphics.Layer(1, function () {
    ctx.fillStyle = ROM.PALETTE.LGREY
    for (st of RAM.stars) {
      ctx.fillRect(st[0] * ROM.W, st[1] * ROM.H, 1, 1)
    }
  }),

  player: new ROM.Graphics.Entity(5, ROM.PALETTE.LBLUE,
    function () {
      ctx.fillStyle = this.color
      ctx.fillRect(this.pos.x - Math.floor(this.size / 2), this.pos.y - Math.floor(this.size / 2), this.size, this.size)
    }, {x: Math.ceil(ROM.W / 2), y: Math.ceil(ROM.H * 0.8)}, {
      motion: {x: 0, y: 0},
      size: 11,
      weapon: {
        cool: 12,
        countdown: 0,
        color: ROM.PALETTE.YELLOW,
        active: false
      },
    }
  ),
  proj: []
}
RAM.tick = function () {
  let dmin = Math.ceil(RAM.layers.player.size / 2)
  RAM.layers.player.pos.x = (RAM.layers.player.pos.x + RAM.layers.player.motion.x).clamp(dmin, ROM.W - Math.ceil(RAM.layers.player.size / 2))
  RAM.layers.player.pos.y = (RAM.layers.player.pos.y + RAM.layers.player.motion.y).clamp(dmin, ROM.H - Math.ceil(RAM.layers.player.size / 2))
  RAM.layers.player.weapon.countdown = (RAM.layers.player.weapon.countdown - 1).clamp(0, 160)

  if (RAM.layers.proj.length > 0) {
    for (var i = RAM.layers.proj.length - 1; i >= 0; i--) {
      var pr = RAM.layers.proj[i]
      pr.pos.x += pr.motion.x
      pr.pos.y += pr.motion.y

      if (pr.persist === false) {
        if (pr.pos.x > ROM.W || pr.pos.x < 0 || pr.pos.y > ROM.H || pr.pos.y < 0) {
          RAM.layers.proj.splice(i, 1)
        }
      }
    }
  }

  if (RAM.layers.player.weapon.active && RAM.layers.player.weapon.countdown === 0) {
    RAM.layers.player.weapon.countdown = RAM.layers.player.weapon.cool
    RAM.layers.proj.push(
      new ROM.Graphics.Projectile(5, RAM.layers.player.weapon.color, function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.pos.x, this.pos.y, 1, 3)
      }, {x: RAM.layers.player.pos.x, y: RAM.layers.player.pos.y - Math.ceil(RAM.layers.player.size / 2)}, {x: RAM.layers.player.motion.x / 5, y: -3})
    )
  }
}

// <region>
RAM.keyDown = function (e) {
  if (e.repeat === false) {
    if (e.code === 'Space') {
      RAM.layers.player.weapon.active = true
    }
    if (e.code === 'KeyD') {
      RAM.layers.player.motion.x += 2
    }
    if (e.code === 'KeyA') {
      RAM.layers.player.motion.x += -2
    }
    if (e.code === 'KeyW') {
      RAM.layers.player.motion.y += -2
    }
    if (e.code === 'KeyS') {
      RAM.layers.player.motion.y += 2
    }
  }
}
RAM.keyUp = function (e) {
  if (RAM.ctape.endsWith('austin')) {
    RAM.austin()
  }
  RAM.ctape = RAM.ctape.substr(RAM.ctape.length - 50)
  if (RAM.ctape.length > 100) {
    RAM.ctape = ''
  }

  if (e.code === 'Space') {
    RAM.layers.player.weapon.active = false
  }
  if (e.code === 'KeyD') {
    RAM.layers.player.motion.x += -2
  }
  if (e.code === 'KeyA') {
    RAM.layers.player.motion.x += 2
  }
  if (e.code === 'KeyW') {
    RAM.layers.player.motion.y += 2
  }
  if (e.code === 'KeyS') {
    RAM.layers.player.motion.y += -2
  }
}
//</region>
ROM.registerCartridge()
