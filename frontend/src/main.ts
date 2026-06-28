import { colorMap } from "./colormap"

const app = document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Mandelbrot Explorer</h1>

  <div>
    <label>
      cx:
      <input id="cx" value="-0.75">
    </label>

    <label>
      cy:
      <input id="cy" value="0.1">
    </label>

    <label>
      scale:
      <input id="scale" value="1">
    </label>

    <button id="draw">
      Draw
    </button>
  </div>

  <canvas id="canvas"></canvas>
`

const cxInput =
  document.querySelector<HTMLInputElement>("#cx")!

const cyInput =
  document.querySelector<HTMLInputElement>("#cy")!

const scaleInput =
  document.querySelector<HTMLInputElement>("#scale")!

const drawButton =
  document.querySelector<HTMLButtonElement>("#draw")!

const canvas =
  document.querySelector<HTMLCanvasElement>("#canvas")!

const ctx = canvas.getContext("2d")!

async function loadMandelbrot(
  cx: number,
  cy: number,
  scale: number
) {

  const response = await fetch(
    `http://localhost:8000/mandelbrot?cx=${cx}&cy=${cy}&scale=${scale}`
  )

  const data = await response.json()

  canvas.width = data.width
  canvas.height = data.height

  canvas.style.width = "800px"
  canvas.style.height = "800px"

  canvas.style.imageRendering = "auto"  

  const imageData =
    ctx.createImageData(
      data.width,
      data.height
    )

  for (let y = 0; y < data.height; y++) {

    for (let x = 0; x < data.width; x++) {

      const value = data.data[
        data.height - 1 - y
      ][x]

      const i =
        (y * data.width + x) * 4

      const c = colorMap(
        value,
        data.max_iter
      )

      imageData.data[i]     = c.r
      imageData.data[i + 1] = c.g
      imageData.data[i + 2] = c.b
      imageData.data[i + 3] = 255
    }
  }

  ctx.putImageData(
    imageData,
    0,
    0
  )

}

drawButton.addEventListener(
  "click",
  () => {

    const cx =
      Number(cxInput.value)

    const cy =
      Number(cyInput.value)

    const scale =
      Number(scaleInput.value)

    loadMandelbrot(
      cx,
      cy,
      scale
    )
  }
)

let dragging = false

let lastX = 0
let lastY = 0

canvas.addEventListener(
  "mousedown",
  (event) => {

    dragging = true

    lastX = event.offsetX
    lastY = event.offsetY

  }
)


canvas.addEventListener(
  "mouseup",
  () => {

    if (!dragging) {
      return
    }

    dragging = false

    loadMandelbrot(
      Number(cxInput.value),
      Number(cyInput.value),
      Number(scaleInput.value)
    )

  }
)

canvas.addEventListener(
  "mouseleave",
  () => {

    dragging = false

  }
)


canvas.addEventListener(
  "mousemove",
  (event) => {

    if (!dragging) {
      return
    }

    const dx =
      event.offsetX - lastX

    const dy =
      event.offsetY - lastY

    lastX = event.offsetX
    lastY = event.offsetY

    const scale =
      Number(scaleInput.value)

    const width =
      3.0 / scale

    const height =
      3.0 / scale

    cxInput.value = String(
      Number(cxInput.value)
      - dx / canvas.width * width
    )

    cyInput.value = String(
      Number(cyInput.value)
      + dy / canvas.height * height
    )

  }
)

loadMandelbrot(
  -0.75,
  0.1,
  1
)
