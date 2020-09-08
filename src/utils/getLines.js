const fs = window.require('fs')

export const getLines = dest => {
  const data = fs.readFileSync(dest, 'utf8')
  return data.split('\n').length
}
