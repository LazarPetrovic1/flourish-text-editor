import React, { useState } from 'react'
import Center from '../styled/center'

// Helper imgs
import so from '../assets/so.png'
import cdn from '../assets/cdn.png'
import fa from '../assets/fa.png'
import gh from '../assets/gh.png'
const { ipcRenderer } = window.require('electron')

function Helpers () {
  const [helpers, setHelpers] = useState(true)
  return (
    <div className='helpers'>
      <Center>
        <i
          className={helpers ? 'fas fa-times' : 'fas fa-caret-down'}
          onClick={() => setHelpers(!helpers)}
        />
      </Center>
      {helpers && (
        <>
          <img
            src={so}
            alt='StackOverflow'
            title='Open StackOverflow in a browser'
            onClick={() =>
              ipcRenderer.send('get-helper', 'https://stackoverflow.com/')}
          />
          <img
            src={gh}
            alt='GitHub'
            title='Open GitHub in a browser'
            onClick={() =>
              ipcRenderer.send('get-helper', 'https://github.com/')}
          />
          <img
            src={fa}
            alt='FontAwesome'
            title='Open FontAwesome in a browser'
            onClick={() =>
              ipcRenderer.send('get-helper', 'https://fontawesome.com/')}
          />
          <img
            src={cdn}
            alt='CDN.js'
            title='Open CDN.js in a browser'
            onClick={() => ipcRenderer.send('get-helper', 'https://cdnjs.com/')}
          />
        </>
      )}
    </div>
  )
}

export default Helpers
