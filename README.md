# Mandelbrot Explorer

A simple Mandelbrot set explorer built with FastAPI and TypeScript.

FastAPI computes Mandelbrot data on the backend, and the frontend renders it using HTML Canvas.

---

# マンデルブロ集合ビューア

FastAPI と TypeScript を用いて作成しているシンプルなマンデルブロ集合ビューアです。

バックエンドでマンデルブロ集合を計算し，フロントエンドで Canvas に描画します。

## Screenshot

The image below shows a highly detailed region near the boundary of the Mandelbrot set.

![Mandelbrot Explorer](images/mbex_2048.png)

**Rendering parameters**

```text
Center:
cx = -0.3745
cy = 0.6055
scale = 2048
```

This region contains rich self-similar spiral structures that become increasingly detailed as the zoom level increases.

## Features / 機能

- Mandelbrot set rendering
- FastAPI backend
- TypeScript frontend
- HTML Canvas visualization
- Numba-accelerated computation

### 現在実装済み

- マンデルブロ集合の計算
- FastAPI による API 提供
- Canvas への描画
- パラメータ入力（cx, cy, scale）
- スクロールによる拡大縮小
- ドラッグによる移動
- Numba による高速化

### 今後実装予定

- お気に入り座標の保存
- 描画品質の向上
- 高解像度画像の保存

## Performance / パフォーマンス

The Mandelbrot computation was optimized using **Numba JIT compilation** and **parallel execution**.

| Implementation   |   Time |
| ---------------- | -----: |
| NumPy            | 12.5 s |
| Numba JIT        | 0.96 s |
| Numba + Parallel | 0.24 s |

The benchmark was performed on the same machine using identical rendering parameters.
Compared with the original NumPy implementation, the Numba + Parallel implementation achieved approximately **50× speedup**.

Numba の JIT コンパイルと並列実行を利用することで，元の NumPy 実装と比較して約 **50 倍** の高速化を達成しました。

## Project Structure

```
mandelbrot-explorer/
├── images/
│   └── mbex_2048.PNG
│
├── backend/
│   ├── main.py
│   ├── mandelbrot.py
│   └── mandelbrot_numba.py
│
└── frontend/
    ├── src/
    └── package.json
```

## Run Backend

```bash
cd backend

uvicorn main:app --reload
```

Backend URL:

```
http://localhost:8000
```

## Run Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

## Example Coordinates

### Favorite Regions

```text
cx    = -0.3745
cy    = 0.6055
scale = 2048
```

```text
cx    = -0.421
cy    = 0.58
scale = 256
```

### Seahorse Valley

```text
cx    = -0.743643887
cy    = 0.131825904
scale = 256
```

These coordinates produce interesting lace-like structures around the boundary of the Mandelbrot set.

## License

MIT License
