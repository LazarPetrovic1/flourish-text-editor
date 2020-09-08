// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SideBar from './components/SideBar'
import CodePlace from './components/CodePlace'
import Application from './styled/app'
import Marginalized from './styled/marginalized'
import Welcome from './styled/welcome'
const { ipcRenderer } = window.require('electron')

function App () {
  const [dir, setDir] = useState('')
  const [content, setContent] = useState('')
  const [selected, setSelected] = useState('')
  const [repo] = useState([
    `The repo has still not been deployed.
    Check with us in the future.`,
    false
  ])
  useEffect(() => {
    ipcRenderer.on('open-file', (e, i) => setDir(i))
  }, [dir, selected])
  return (
    <Application>
      <SideBar
        dir={dir}
        setSelected={setSelected}
        content={content}
        setContent={setContent}
        selected={selected}
      />
      <Marginalized>
        {content || selected ? (
          <CodePlace
            setDir={setDir}
            setSelected={setSelected}
            selected={selected}
            content={content}
            setContent={setContent}
          />
        ) : (
          <Welcome>
            <h1 className='opening-welcome-text'>Welcome to flourish!</h1>
            <h5 className='helper-welcome-text'>
              Press <code>Ctrl + O</code> to open a project directory.
            </h5>
            <div className='misc-text'>
              If you're really interested in this product, please check out our
              repo at:
            </div>
            <div className={repo[1] ? 'repo-success' : 'repo-fail'}>
              {repo[0]}
            </div>
          </Welcome>
        )}
      </Marginalized>
    </Application>
  )
}

export default App
