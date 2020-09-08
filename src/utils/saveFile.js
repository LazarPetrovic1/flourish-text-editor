const fs = window.require('fs')

export const saveFile = (dest, content) => {
  fs.writeFileSync(dest, content, 'utf-8')
}
