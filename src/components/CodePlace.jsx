// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import TextArea from '../styled/textarea'
import ImageRenderer from '../styled/imagerenderer'
import Numbered from '../styled/numbered'
import ImagePrompt from '../styled/imageprompt'
import { getLines } from '../utils/getLines'
import { isImage } from '../utils/isImage'
import { range } from '../utils/range'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import { saveFile } from '../utils/saveFile'
const fs = window.require('fs')
const { ipcRenderer } = window.require('electron')

function CodePlace ({ content, setContent, selected, setSelected, setDir }) {
  const [lineNumbers, setLineNumbers] = useState([1])
  const [image, setImage] = useState(false)
  useEffect(() => {
    ;(async function () {
      if (selected) {
        const x = getLines(selected.path)
        if (lineNumbers.length <= 1) {
          const nums = range(1, x + 1)
          setLineNumbers(nums)
        }

        if (isImage(selected.path)) {
          await setImage(true)
        } else if (!isImage(selected.path)) {
          setImage(false)
        }
      }

      if (!selected && content.length < 1 && lineNumbers.length !== 1) {
        setLineNumbers([1])
      }
    })()
  }, [selected, lineNumbers, image])

  ipcRenderer.on('save-file', () => {
    return saveFile(selected.path, content)
  })

  ipcRenderer.on('close-file', () => {
    setContent('')
    setSelected('')
  })

  const onKeyDown = e => {
    // Some keycode behaviours
    e.persist()
    if (e.keyCode === 13) {
      // Enter || Return
      setLineNumbers([...lineNumbers, lineNumbers[lineNumbers.length - 1] + 1])
      // return
    }

    if (e.keyCode === 9) {
      // Tab
      setContent(content + ' ' + ' ')
      // return
    }

    if (e.keyCode === 8) {
      // Backspace
      if (lineNumbers.length === 1) {
        // return
      }

      if (content.split('\n')[content.split('\n').length - 1].length < 1) {
        setLineNumbers(lineNumbers.slice(0, lineNumbers.length - 1))
        // return
      }
    }

    switch (e.key) {
      case 'WakeUp':
      case 'Control':
      case 'Shift':
      case 'CapsLock':
      case 'Alt':
      case 'PageUp':
      case 'PageDown':
      case 'Delete':
      case 'Insert':
      case 'End':
      case 'Home':
      case 'F1':
      case 'F2':
      case 'F3':
      case 'F4':
      case 'F5':
      case 'F6':
      case 'F7':
      case 'F8':
      case 'F9':
      case 'F10':
      case 'F11':
      case 'F12':
      case 'Escape':
        break
      default:
        break
    }
  }

  const onChange = e => {
    e.persist()
    setContent(e.target.value)
  }

  return image ? (
    <ImageRenderer>
      <img
        title={selected.name}
        src={`root://${selected.path}`}
        alt='A rendering of non-textual file'
      />
    </ImageRenderer>
  ) : (
    <div className='codespot'>
      <ScrollSync>
        <>
          <ScrollSyncPane>
            <Numbered className='nrs'>
              {lineNumbers &&
                lineNumbers.map(val => <div key={val}>{val}</div>)}
            </Numbered>
          </ScrollSyncPane>
          <ScrollSyncPane>
            <TextArea
              value={content}
              onKeyDown={onKeyDown}
              onChange={onChange}
            />
          </ScrollSyncPane>
        </>
      </ScrollSync>
    </div>
  )
}

export default CodePlace
