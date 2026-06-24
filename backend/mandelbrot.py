import numpy as np

def calculate_mandelbrot(
    cx: float,
    cy: float,
    scale: float,
):
    
    # 最大反復回数
    max_iter = int(300 + 50 * np.log2(scale + 1))

    # 描画範囲
    base_width = 3.0
    base_height = 3.0

    # 解像度
    width=int(300 + 300 * np.log2(scale + 1))
    height = width
    x_width = base_width / scale
    y_height = base_height / scale

    xmin = cx - x_width / 2
    xmax = cx + x_width / 2
    ymin = cy - y_height / 2
    ymax = cy + y_height / 2

    # 複素平面
    x = np.linspace(xmin, xmax, width)
    y = np.linspace(ymin, ymax, height)

    X, Y = np.meshgrid(x, y)
    C = np.array(X + 1j * Y, dtype=np.complex128)

    # 初期値
    Z = np.zeros_like(C)

    # 発散回数記録用
    divergence_step = np.full(C.shape, max_iter, dtype=float)

    # cardioid 判定
    q = (X - 0.25)**2 + Y**2

    inside_cardioid = (
        q * (q + (X - 0.25))
        < 0.25 * Y**2
    )

    # period-2 bulb
    inside_bulb = (
        (X + 1)**2 + Y**2
        < 0.0625
    )

    inside = inside_cardioid | inside_bulb

    divergence_step[inside] = 0

    mask = ~inside

    for i in range(max_iter):

        # 未発散点だけ更新
        Z[mask] = Z[mask]**2 + C[mask]

        # 発散判定
        diverged = (
            Z.real * Z.real
            + Z.imag * Z.imag
        ) > 4.0

        # 今回新しく発散した点
        newly_diverged = diverged & mask

        # 発散回数を記録
        abs_z = np.abs(Z[newly_diverged]) + 1e-12

        nu = i + 1 - np.log(np.log(abs_z)) / np.log(2.0)

        divergence_step[newly_diverged] = nu

        # 発散済みを除外
        mask &= ~diverged
        
        if not mask.any():
            break

    # 最後まで発散しなかった点
    divergence_step[mask] = 0



    return {
        "width": width,
        "height": height,
        "data": divergence_step.tolist(),
    }
