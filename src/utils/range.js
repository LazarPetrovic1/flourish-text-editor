export const range = (start = 0, stop) => {
  const arr = []
  for (let i = start; i < stop; i++) {
    arr.push(i)
  }
  return arr
}
