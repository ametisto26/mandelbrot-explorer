import time

import numpy as np
from numba import njit, prange


@njit(cache=True, fastmath=True)
def _mandelbrot_value(
    cx,
    cy,
    max_iter,
):
    # cardioid 判定
    q = (
        (cx - 0.25) * (cx - 0.25)
        + cy * cy
    )

    if (
        q * (q + cx - 0.25)
        < 0.25 * cy * cy
    ):
        return 0.0

    # period-2 bulb 判定
    if (
        (cx + 1.0) * (cx + 1.0)
        + cy * cy
        < 0.0625
    ):
        return 0.0

    zr = 0.0
    zi = 0.0

    LOG2 = np.log(2.0)

    for i in range(max_iter):

        zr2 = zr * zr
        zi2 = zi * zi

        if zr2 + zi2 > 4.0:

            modulus = np.sqrt(
                zr2 + zi2
            )

            return (
                i + 1
                - np.log(
                    np.log(modulus)
                ) / LOG2
            )

        new_zr = (
            zr2
            - zi2
            + cx
        )

        zi = (
            2.0 * zr * zi
            + cy
        )

        zr = new_zr

    return 0.0


@njit(cache=True, parallel=True, fastmath=True)
def _calculate(
    xmin,
    xmax,
    ymin,
    ymax,
    width,
    height,
    max_iter,
):
    result = np.zeros(
        (height, width),
        dtype=np.float64
    )

    dx = (xmax - xmin) / (width - 1)
    dy = (ymax - ymin) / (height - 1)

    for py in prange(height):

        cy = ymin + py * dy

        for px in range(width):

            cx = xmin + px * dx

            result[py, px] = _mandelbrot_value(
                cx,
                cy,
                max_iter,
            )

    return result


def calculate_mandelbrot(
    cx: float,
    cy: float,
    scale: float,
):
    start = time.perf_counter()

    max_iter = int(
        300 + 50 * np.log2(scale + 1)
    )

    # 描画範囲
    base_width = 3.0
    base_height = 3.0

    # 解像度
    width = min(
        int(
            1200
            + 150 * np.log2(scale + 1)
        ),
        2000
    )

    height = width

    x_width = base_width / scale
    y_height = base_height / scale

    xmin = cx - x_width / 2
    xmax = cx + x_width / 2
    ymin = cy - y_height / 2
    ymax = cy + y_height / 2

    divergence_step = _calculate(
        xmin,
        xmax,
        ymin,
        ymax,
        width,
        height,
        max_iter,
    )

    calc_end = time.perf_counter()

    result = {
        "width": width,
        "height": height,
        "data": divergence_step.tolist(),
        "max_iter": max_iter,
    }

    json_end = time.perf_counter()

    print(
        f"calculate: "
        f"{calc_end - start:.3f}s"
    )

    print(
        f"tolist : "
        f"{json_end - calc_end:.3f}s"
    )

    return result
