const app = document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Mandelbrot Explorer</h1>
  <canvas id="canvas"></canvas>
`

const canvas =
  document.querySelector<HTMLCanvasElement>("#canvas")!

const ctx = canvas.getContext("2d")!

async function loadMandelbrot() {

  const response = await fetch(
    "http://localhost:8000/mandelbrot?cx=-0.75&cy=0.1&scale=1"
  )

  const data = await response.json()

  console.log(data)

  canvas.width = data.width
  canvas.height = data.height

  // console.log(canvas.width)
  // console.log(canvas.height)

  const imageData =
    ctx.createImageData(
      data.width,
      data.height
    )

  for (let y = 0; y < data.height; y++) {

    for (let x = 0; x < data.width; x++) {

      const value = data.data[y][x]

      const color =
        Math.min(
          255,
          Math.floor(value)
        )

      const i =
        (y * data.width + x) * 4

      imageData.data[i]     = color
      imageData.data[i + 1] = color
      imageData.data[i + 2] = color
      imageData.data[i + 3] = 255
    }
  }

  ctx.putImageData(
    imageData,
    0,
    0
  )

}

loadMandelbrot()
