const { shell } = window.require('electron')

export const handleRedirectFront = (e, url) => {
  // e.preventDefault()
  shell.openExternal(url)
}
