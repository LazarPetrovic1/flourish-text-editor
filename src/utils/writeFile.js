const fs = window.require('fs')

export const writeFile = path => {
  return fs.writeFileSync(path, '', 'utf-8')
}
