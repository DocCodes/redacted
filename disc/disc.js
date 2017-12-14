RAM.cart = {
  title: 'DISC',
  author: 'Evan Young',
  copyright: 'Copyright (c) Evan Young 2017',
  version: '1.0.2',
  date: '12/12/2017'
}
RAM.layers = {
  background: new ROM.Graphics.Layer(0, function () {
    window.ctx.fillStyle = ROM.PALETTE.LBLUE
    window.ctx.fillRect(0, 0, ROM.W, ROM.H)
  }),
  border: new ROM.Graphics.Border(50),

  disc: new ROM.Graphics.Icon(1, 'floppy', ROM.PALETTE.WHITE, 3, 'cc'),
  que: new ROM.Graphics.Icon(2, 'que', ROM.PALETTE.WHITE, 2, 'cc', Math.ceil(ROM.W/2), Math.ceil(ROM.H/2) + 19)
}
ROM.registerCartridge()
