function lerp(
  a: number,
  b: number,
  t: number
) {
  return Math.floor(
    a + (b - a) * t
  )
}

export function colorMap(
  value: number,
  maxIter: number
) {

  if (value === 0) {
    return {
      r: 0,
      g: 0,
      b: 0
    }
  }

  const t = Math.pow(
    Math.min(value / maxIter, 1),
    0.65
  )

  const colors = [
    { r: 10,  g: 20,  b: 80  },   // 濃い青
    { r: 90,  g: 40,  b: 180 },   // 紫
    { r: 230, g: 120, b: 255 },   // ピンク
    { r: 255, g: 255, b: 255 }    // 白
  ]

  const n = colors.length - 1

  const x = t * n

  const i = Math.min(
    Math.floor(x),
    n - 1
  )

  const u = x - i

  const c0 = colors[i]
  const c1 = colors[i + 1]

  return {
    r: lerp(c0.r, c1.r, u),
    g: lerp(c0.g, c1.g, u),
    b: lerp(c0.b, c1.b, u)
  }
}
