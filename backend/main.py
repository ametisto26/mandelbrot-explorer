from fastapi import FastAPI

from mandelbrot import calculate_mandelbrot

app = FastAPI()

@app.get("/")
def root():
    return {
        "message": "hello mandelbrot"
    }

@app.get("/mandelbrot")
def mandelbrot(
    cx: float,
    cy: float,
    scale: float
):
    return calculate_mandelbrot(cx, cy, scale)

