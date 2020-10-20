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
const { lstatSync } = require('fs')
const handleRedirect = require('./utils/handleRedirect')
const openTerminal = require('./utils/openTerminal')

const isMac = process.platform === 'darwin'
let win, loader, helper

ipcMain.on('get-helper', (item, url) => handleRedirect(item, url))
ipcMain.on('get-terminal', (e, path) => openTerminal(path))

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New file',
        click: () => win.webContents.send('new-file', require('os').homedir()),
        accelerator: 'Ctrl+N'
      },
      {
        label: 'Open File',
        click: async () => {
          const { filePaths } = await dialog.showOpenDialog({
            properties: ['showHiddenFiles']
          })

          const type = (await lstatSync(filePaths[0]).isFile())
            ? 'file'
            : 'directory'

          const name = await filePaths[0].split('/')[
            filePaths[0].split('/').length - 1
          ]

          win.webContents.send('open-file', { path: filePaths[0], type, name })
        },
        accelerator: 'Ctrl+O'
      },
      { type: 'separator' },
      {
        label: 'Open Project Folder',
        click: async () => {
          const { filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory', 'showHiddenFiles']
          })
          const tree = await dirTree(filePaths[0])
          win.webContents.send('open-project', tree)
        },
        accelerator: 'Ctrl+Shift+O'
      },
      {
        label: 'Save File',
        click: () => {
          win.webContents.send('save-file')
        },
        accelerator: 'Ctrl+S'
      },
      { type: 'separator' },
      {
        label: 'Open CodeLine',
        click: () => win.webContents.send('open-code-line'),
        accelerator: 'Ctrl+Shift+I'
      },
      { type: 'separator' },
      {
        label: 'Toggle Side Helpers',
        click: () => win.webContents.send('toggle-helpers'),
        accelerator: 'Ctrl+Shift+H'
      },
      { type: 'separator' },
      {
        label: 'Remove File',
        click: () => win.webContents.send('remove-file'),
        accelerator: 'Delete'
      },
      { type: 'separator' },
      {
        label: 'Close File',
        click: async () => {
          win.webContents.send('close-file')
        },
        accelerator: 'Ctrl+W'
      },
      {
        label: 'Quit',
        click: () => {
          win = null
          app.quit()
        },
        accelerator: 'Ctrl+Shift+Q'
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
            : console.warn('Window undefined. Hello, there!'),
        accelerator: 'Ctrl+Q'
      },
      {
        label: 'Reload',
        click: () =>
          win ? win.reload() : console.warn('Window undefined. Hi, there'),
        accelerator: 'Ctrl+R'
      }
    ]
  },
  {
    label: 'Helpers',
    submenu: [
      {
        label: 'Stack Overflow',
        click: e => {
          handleRedirect(e, 'https://stackoverflow.com/')
        },
        accelerator: 'Ctrl+Alt+S'
      },
      {
        label: 'GitHub',
        click: e => {
          handleRedirect(e, 'https://github.com/')
        },
        accelerator: 'Ctrl+Alt+G'
      },
      {
        label: 'Font Awesome',
        click: e => {
          handleRedirect(e, 'https://fontawesome.com/')
        },
        accelerator: 'Ctrl+Alt+F'
      },
      {
        label: 'CDNjs',
        click: e => {
          handleRedirect(e, 'https://cdnjs.com/')
        },
        accelerator: 'Ctrl+Alt+C'
      },
      {
        label: 'Figma',
        click: e => {
          handleRedirect(e, 'https://www.figma.com/')
        },
        accelerator: 'Ctrl+Alt+X'
      },
      {
        label: 'Gitlab',
        click: e => {
          handleRedirect(e, 'https://about.gitlab.com/')
        },
        accelerator: 'Ctrl+Alt+L'
      },
      {
        label: 'Google Fonts',
        click: e => {
          handleRedirect(e, 'https://fonts.google.com/')
        },
        accelerator: 'Ctrl+Alt+K'
      },
      {
        label: 'Photopea',
        click: e => {
          handleRedirect(e, 'https://www.photopea.com/')
        },
        accelerator: 'Ctrl+Alt+P'
      },
      {
        label: 'Wordpress',
        click: e => {
          handleRedirect(e, 'https://wordpress.com/')
        },
        accelerator: 'Ctrl+Alt+M'
      },
      {
        label: 'Pixabay',
        click: e => {
          handleRedirect(e, 'https://pixabay.com/')
        },
        accelerator: 'Ctrl+Alt+Y'
      },
      {
        label: 'Unsplash',
        click: e => {
          handleRedirect(e, 'https://unsplash.com/')
        },
        accelerator: 'Ctrl+Alt+U'
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Open Help File',
        click: e =>
          win
            ? win.webContents.send('get-help', __dirname)
            : console.warn('Window undefined. Hello, there!'),
        accelerator: 'Ctrl+H'
      },
      {
        label: 'View License',
        click: e =>
          win
            ? win.webContents.send('get-license', __dirname)
            : console.warn('Window undefined. Hello, there!'),
        accelerator: 'Ctrl+<'
      },
      {
        label: "What's left",
        click: e =>
          win
            ? win.webContents.send('jobs-left', __dirname)
            : console.warn('Window undefined. Hello, there!'),
        accelerator: 'Ctrl+>'
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
    width: 1000,
    height: 770,
    webPreferences: {
      nodeIntegration: true,
      spellcheck: true,
      enableRemoteModule: true,
      transparent: true
    },
    icon: `${__dirname}/assets/logo.png`
  })

  win.loadURL('http://localhost:3000')
  win.on('closed', function () {
    win = null
  })

  loader.close()

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer')

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.warn(`The following error occured: ${err}`)
    })

  installExtension(REDUX_DEVTOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.warn(`The following error occured: ${err}`)
    })
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

  loader = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false
  })

  loader.loadFile(`${__dirname}/loading.html`)

  // setTimeout(function () {
  createWindow()
  // }, 5000) // Takes about 5s to load electron and react after npm run dev, might as well show a simple animation
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
