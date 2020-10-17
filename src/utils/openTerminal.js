const { app } = require('electron')
const { spawn } = require('child_process')

function openTerminal (path) {
  const terminal = 'gnome-terminal'
  const openTerminalAtPath = spawn(terminal, { cwd: path })
  openTerminalAtPath.on('error', err => {
    console.log(err)
  })
}

module.exports = openTerminal
