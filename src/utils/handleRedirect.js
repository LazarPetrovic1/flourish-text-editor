const { shell } = require('electron')

const handleRedirect = (e, url) => {
  // e.preventDefault()
  shell.openExternal(url)
}

module.exports = handleRedirect
