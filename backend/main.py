from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mandelbrot import calculate_mandelbrot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

