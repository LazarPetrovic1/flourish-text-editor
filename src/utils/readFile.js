const fs = window.require('fs')

export const readFile = file => {
  return fs.readFileSync(file, 'utf-8')
}
