# Mandelbrot Explorer

A simple Mandelbrot set explorer built with FastAPI and TypeScript.

FastAPI computes Mandelbrot data on the backend, and the frontend renders it using HTML Canvas.

---

# マンデルブロ集合ビューア

FastAPI と TypeScript を用いて作成しているシンプルなマンデルブロ集合ビューアです。

バックエンドでマンデルブロ集合を計算し，フロントエンドで Canvas に描画します。

## Features / 機能

- Mandelbrot set rendering
- FastAPI backend
- TypeScript frontend
- HTML Canvas visualization

### 現在実装済み

- マンデルブロ集合の計算
- FastAPI による API 提供
- Canvas への描画
- パラメータ入力（cx, cy, scale）
- スクロールによる拡大縮小

### 今後実装予定

- クリックによるズーム
- カラーマップ対応
- お気に入り座標の保存

## Project Structure

```
mandelbrot-explorer/
├── backend/
│   ├── main.py
│   └── mandelbrot.py
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

## Example

```text
cx    = -0.421
cy    = 0.58
scale = 256
```

```text
cx    = -0.743643887
cy    = 0.131825904
scale = 256
```

These coordinates produce interesting lace-like structures around the boundary of the Mandelbrot set.

## License

MIT License
