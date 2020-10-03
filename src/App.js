// React
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SideBar from './components/SideBar'
import CodePlace2 from './components/CodePlace2'
import Tabs from './components/Tabs'
import Application from './styled/app'
import Marginalized from './styled/marginalized'
import Welcome from './styled/welcome'
import CodeLine from './components/CodeLine'
import Helpers from './components/Helpers'
import { readFile } from './utils/readFile'
import { v4 as uuid } from 'uuid'

// Redux
import store from './store'
import { connect, batch } from 'react-redux'
import { setContent } from './actions/content'
import { selectItem, deselectItem } from './actions/selection'
import { setTab, closeTab } from './actions/tab'
import { setDirectory } from './actions/directories'
import { setDirectoryList } from './actions/dirlist'

import { isEmpty } from './utils/isEmpty'
import { handleRedirectFront } from './utils/handleRedirectFront'

// Electron
const { ipcRenderer } = window.require('electron')

function App ({ tab, selected, dir, content }) {
  const [actualContent, setActualContent] = useState('')
  const [codeLine, setCodeLine] = useState(false)
  const [repo] = useState(
    'https://github.com/LazarPetrovic1/flourish-text-editor'
  )

  ipcRenderer.on('open-project', (e, i) => {
    batch(() => {
      store.dispatch(setDirectory(i))
      store.dispatch(setDirectoryList({ ...i, opened: new Date(), id: uuid() }))
    })
  })

  ipcRenderer.on('open-file', (e, selected) => {
    const content = readFile(selected.path)
    const actualContent = readFile(selected.path)
    const tablet = { id: uuid(), ...selected, content, actualContent }
    batch(() => {
      store.dispatch(setContent(content))
      store.dispatch(selectItem(tablet))
      store.dispatch(setTab(tablet))
    })
  })

  ipcRenderer.on('get-help', (e, here) => {
    const item = {
      id: 'HELP_PAGE',
      name: 'Help.md',
      path: `${here}/docs/help/Help.md`,
      content: readFile(`${here}/docs/help/Help.md`),
      actualContent: readFile(`${here}/docs/help/Help.md`),
      type: 'file',
      isHelper: true
    }

    batch(() => {
      store.dispatch(setContent(item.path))
      store.dispatch(selectItem(item))
      store.dispatch(setTab(item))
    })
  })

  ipcRenderer.on('get-license', (e, here) => {
    const item = {
      id: 'LICENSE_PAGE',
      name: 'LICENSE.md',
      path: `${here}/docs/license/LICENSE.md`,
      content: readFile(`${here}/docs/license/LICENSE.md`),
      actualContent: readFile(`${here}/docs/license/LICENSE.md`),
      type: 'file',
      isHelper: true
    }

    batch(() => {
      store.dispatch(setContent(item.path))
      store.dispatch(selectItem(item))
      store.dispatch(setTab(item))
    })
  })

  ipcRenderer.on('jobs-left', (e, here) => {
    const item = {
      id: 'TO_DO_LIST',
      name: 'TO_DO.md',
      path: `${here}/docs/todo/TO_DO.md`,
      content: readFile(`${here}/docs/todo/TO_DO.md`),
      actualContent: readFile(`${here}/docs/todo/TO_DO.md`),
      type: 'file',
      isHelper: true
    }

    batch(() => {
      store.dispatch(setContent(item.path))
      store.dispatch(selectItem(item))
      store.dispatch(setTab(item))
    })
  })

  ipcRenderer.on('open-code-line', () => setCodeLine(true))

  return (
    <Application>
      <SideBar />
      <div className='tab-editor'>
        <Tabs actualContent={actualContent} />
        <Marginalized>
          {codeLine ? (
            <CodeLine setCodeLine={setCodeLine} />
          ) : tab.length > 0 && !isEmpty(selected) ? (
            <CodePlace2
              actualContent={actualContent}
              setActualContent={setActualContent}
            />
          ) : (
            <Welcome>
              <h1 className='opening-welcome-text'>Welcome to flourish!</h1>
              <h5 className='helper-welcome-text'>
                Press <code>Ctrl + Shift + O</code> to open a project directory.
              </h5>
              <div className='misc-text'>
                If you're really interested in this product, please check out
                our repo at:
              </div>
              <div
                className='repo-success'
                onClick={e => handleRedirectFront(e, repo)}
              >
                {repo}
              </div>
            </Welcome>
          )}
        </Marginalized>
        <Helpers />
      </div>
    </Application>
  )
}

const mapStateToProps = state => ({
  tab: state.tab,
  dir: state.dir,
  selected: state.selection,
  content: state.content
})

const mapDispatchToProps = dispatch => ({
  setContent: x => dispatch(setContent(x)),
  selectItem: x => dispatch(selectItem(x)),
  setTab: x => dispatch(setTab(x)),
  setDirectory: x => dispatch(setDirectory(x)),
  closeTab: x => dispatch(closeTab(x)),
  deselectItem: () => dispatch(deselectItem())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
// Some text
