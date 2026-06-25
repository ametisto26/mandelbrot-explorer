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

  const t =
       Math.min(
              value / maxIter,
              1
       )

  return {
    r: Math.floor(
      40 + 215 * t
    ),
    g: Math.floor(
      20 + 120 * t
    ),
    b: Math.floor(
      120 + 135 * t
    )
  }
}
