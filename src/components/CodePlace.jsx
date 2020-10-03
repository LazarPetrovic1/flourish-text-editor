// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import TextArea from '../styled/textarea'
import HelpRender from '../styled/helprender'
import ImageRenderer from '../styled/imagerenderer'
import Numbered from '../styled/numbered'
import { getLines } from '../utils/getLines'
import { isImage } from '../utils/isImage'
import { range } from '../utils/range'
import { readFile } from '../utils/readFile'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import { saveFile } from '../utils/saveFile'
import { connect } from 'react-redux'
import { closeTab } from '../actions/tab'
import { setContent } from '../actions/content'
import { deselectItem, selectItem } from '../actions/selection'
const { ipcRenderer } = window.require('electron')

function CodePlace ({
  dir,
  content,
  tabs,
  selected,
  actualContent,
  setActualContent
}) {
  const [lineNumbers, setLineNumbers] = useState([1])
  const [image, setImage] = useState(false)
  const [isHelper, setIsHelper] = useState(false)
  useEffect(() => {
    ;(async function () {
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

      if (!selected && content.length < 1 && lineNumbers.length !== 1) {
        setLineNumbers([1])
      }

      if (selected && selected.isHelper) {
        setIsHelper(true)
      }
    })()
    setContent(selected)
    setActualContent(readFile(selected.path))
    // eslint-disable-next-line
  }, [selected])

  ipcRenderer.on('save-file', () => {
    setContent({ content: actualContent })
    return saveFile(selected.path, actualContent)
  })

  ipcRenderer.on('close-file', async () => {
    if (tabs.length === 1) {
      await closeTab(selected.path)
      await deselectItem()
      await setContent({ content: '' })
      return
    }
    await closeTab(selected.path)
    await selectItem(tabs[0])
    await setContent(selected)
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
      setActualContent(actualContent.concat(' ', ' '))
      // return
    }

    if (e.keyCode === 8) {
      // Backspace
      if (lineNumbers.length === 1) {
        // return
      }

      if (
        actualContent.split('\n')[actualContent.split('\n').length - 1].length <
        1
      ) {
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
      // case '{':
      //   setActualContent(actualContent.concat('{', '}'))
      //   break
      // case '[':
      //   setActualContent(actualContent.concat('[', ']'))
      //   break
      // case '(':
      //   setActualContent(actualContent.concat('(', ')'))
      //   break
      default:
        break
    }
  }

  const onChange = async e => {
    e.persist()
    await setActualContent(e.target.value)
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
            {!isHelper ? (
              <Numbered className='nrs'>
                {lineNumbers &&
                  lineNumbers.map(val => <div key={val}>{val}</div>)}
              </Numbered>
            ) : null}
          </ScrollSyncPane>
          <ScrollSyncPane>
            {isHelper ? (
              <>
                <HelpRender>
                  <MarkdownPreview source={actualContent} />
                </HelpRender>
              </>
            ) : (
              <TextArea
                value={actualContent}
                onKeyDown={onKeyDown}
                onChange={onChange}
              />
            )}
          </ScrollSyncPane>
        </>
      </ScrollSync>
    </div>
  )
}

const mapStateToProps = state => ({
  dir: state.directories,
  content: state.content,
  tabs: state.tab,
  selected: state.selection
})

export default connect(mapStateToProps, {
  closeTab,
  setContent,
  deselectItem,
  selectItem
})(CodePlace)
