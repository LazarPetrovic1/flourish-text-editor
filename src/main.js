const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  shell,
  Tray,
  ipcMain,
  protocol
} = require('electron')
const path = require('path')
const dirTree = require('directory-tree')

const isMac = process.platform === 'darwin'
let win

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        click: async () => {
          const { filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory', 'showHiddenFiles']
          })
          const tree = await dirTree(filePaths[0])
          win.webContents.send('open-file', tree)
        },
        accelerator: 'Ctrl+O'
      },
      {
        label: 'Save File',
        click: () => {
          win.webContents.send('save-file')
        },
        accelerator: 'Ctrl+S'
      },
      {
        label: 'Close File',
        click: async () => {
          win.webContents.send('close-file')
        },
        accelerator: 'Ctrl+W'
      }
    ]
  },
  {
    label: 'Dev',
    submenu: [
      {
        label: 'Toggle Dev Tools',
        click: () =>
          win
            ? win.webContents.toggleDevTools()
            : console.log('Window undefined. Hello, there!'),
        accelerator: 'Ctrl+Q'
      },
      {
        label: 'Reload',
        click: () =>
          win ? win.reload() : console.log('Window undefined. Hi, there'),
        accelerator: 'Ctrl+R'
      }
    ]
  }
]
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'root',
    privileges: {
      standard: true,
      secure: true
    }
  }
])

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      spellcheck: true,
      enableRemoteModule: true
    },
    icon: `${__dirname}/assets/logo.png`
  })

  win.loadURL('http://localhost:3000')
  // win.webContents.openDevTools()
  win.on('closed', function () {
    win = null
  })

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  // access to the root of the system, policy of some framework may prevent the use of file://
  protocol.registerFileProtocol('root', (request, callback) => {
    let url = request.url.substr(7)
    if (url) {
      if (url[url.length - 1] == '/') {
        url = url.substr(0, url.length - 1)
      }
      callback({ path: url })
    } else {
      callback({ error: -324 })
    }
  })

  createWindow()
})

app.on('window-all-closed', function () {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
