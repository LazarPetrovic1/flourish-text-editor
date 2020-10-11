const fs = window.require('fs')
export const deleteFile = path => fs.unlinkSync(path)
