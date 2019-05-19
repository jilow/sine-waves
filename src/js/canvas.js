import * as dat from 'dat.gui'

const gui = new dat.GUI()
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const wave = {
  y: canvas.height / 2,
  length: 0.005,
  amplitude: 150,
  frequency: 0.02,
}

const bgColour = {
  r: 0,
  b: 0,
  g: 0,
  a: 0.08,
}

const stroke = {
  hue: 255,
  saturation: 30,
  lightness: 30,
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
waveFolder.open()

const strokeFolder = gui.addFolder('stroke')
strokeFolder.add(stroke, 'hue', 0, 255)
strokeFolder.add(stroke, 'saturation', 0, 100)
strokeFolder.add(stroke, 'lightness', 0, 100)
strokeFolder.open()

const bgFolder = gui.addFolder('background')
bgFolder.add(bgColour, 'r', 0, 255)
bgFolder.add(bgColour, 'g', 0, 255)
bgFolder.add(bgColour, 'b', 0, 255)
bgFolder.add(bgColour, 'a', 0, 1)
bgFolder.open()

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

let increment = wave.frequency
const animate = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  window.requestAnimationFrame(animate)

  context.fillStyle = `rgba(${bgColour.r}, ${bgColour.b}, ${bgColour.g}, ${bgColour.a})`
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.beginPath()
  context.moveTo(0, canvas.height / 2)
  for (let i = 0; i < canvas.width; i++) {
    context.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
  }
  context.strokeStyle = `hsl(${Math.abs(stroke.hue * Math.sin(increment))}, ${stroke.saturation}%, ${stroke.lightness}%)`
  context.stroke()

  increment += wave.frequency
}

animate()
