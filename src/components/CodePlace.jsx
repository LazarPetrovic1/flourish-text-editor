// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { isImage } from '../utils/isImage'
import { saveFile } from '../utils/saveFile'
import { getModes } from '../utils/getModes'
import { getSnippets } from '../utils/getSnippets'
import { connect, batch } from 'react-redux'
import { closeTab, killTabs } from '../actions/tab'
import { setContent } from '../actions/content'
import { deselectItem, selectItem, setSelContent } from '../actions/selection'
import store from '../store'
import ImageComponent from './misc/ImageComponent'
import LanguageComponent from './misc/LanguageComponent'
import EditorComponent from './misc/EditorComponent'
import ThemeComponent from './misc/ThemeComponent'
import HelperRenderingComponent from './misc/HelperRenderingComponent'
import Minimap from './misc/Minimap'
import {
  FILTER_TABS,
  SELECT_ITEM,
  DESELECT_ITEM,
  KILL_TABS,
  KILL_CONTENT
} from '../actions/types'

const { ipcRenderer } = window.require('electron')

function CodePlace ({
  dir,
  content,
  tabs,
  selected,
  actualContent,
  setActualContent,
  setSelContent,
  closeTab,
  setContent,
  deselectItem,
  selectItem,
  killTabs
}) {
  const [isHelper, setIsHelper] = useState(false)
  const [image, setImage] = useState(false)
  const [language, setLanguage] = useState('')
  const [editorTheme, setEditorTheme] = useState('twilight')
  const [modalBottom, setModalBottom] = useState(false)

  useEffect(() => {
    ;(async function () {
      if (isImage(selected.path)) {
        await setImage(true)
      } else if (!isImage(selected.path)) {
        await setImage(false)
      }

      if (selected && selected.isHelper) {
        setIsHelper(true)
      }

      await setContent(selected)
      await setActualContent(selected.actualContent)
    })()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    autoDetectLanguage()
    // eslint-disable-next-line
  }, [selected])

  useEffect(() => {
    ipcRenderer.on('close-file', closeFile)
    // eslint-disable-next-line
  }, [])

  ipcRenderer.on('save-file', e => {
    // setContent({ content: actualContent })
    // setSelContent({ ...selected, content: actualContent })
    saveFile(selected.path, selected.actualContent)
  })

  const autoDetectLanguage = () => {
    if (selected.extension) {
      setLanguage(getModes(selected.extension.slice(1)))
      require(`ace-builds/src-noconflict/mode-${getModes(
        selected.extension.slice(1)
      )}`)
      require(`ace-builds/src-noconflict/${getSnippets(
        selected.extension.slice(1)
      )}`)
    }
  }

  const onChange = async e => {
    await setActualContent(e)
    await setSelContent({ ...selected, actualContent: e })
  }

  const closeFile = () => {
    const thisTab = store.getState().tab.find(tab => tab.path === selected.path)
    const foundTab = store
      .getState()
      .tab.find(tab => tab.path !== store.getState().selection.path)
    if (!thisTab && !foundTab) return
    if (foundTab) {
      batch(() => {
        store.dispatch({ type: FILTER_TABS, payload: thisTab.path })
        store.dispatch({ type: SELECT_ITEM, payload: foundTab })
      })
    } else {
      batch(() => {
        store.dispatch({ type: KILL_TABS })
        store.dispatch({ type: DESELECT_ITEM })
        store.dispatch({ type: KILL_CONTENT })
      })
    }
  }

  return image ? (
    <ImageComponent selected={selected} />
  ) : isHelper ? (
    <HelperRenderingComponent actualContent={actualContent} />
  ) : (
    <div className='codespot2'>
      <div
        style={{
          width: 'calc(100vw - 232px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <EditorComponent
          className='ace-editor-main'
          name='ACE_EDITOR_COMPONENT'
          language={language}
          setLanguage={setLanguage}
          editorTheme={editorTheme}
          setEditorTheme={setEditorTheme}
          setModalBottom={setModalBottom}
          selected={selected}
          onChange={onChange}
          needsBot
        />
        {modalBottom === 'language' ? (
          <LanguageComponent
            autoDetectLanguage={autoDetectLanguage}
            setLanguage={setLanguage}
            setModalBottom={setModalBottom}
          />
        ) : modalBottom === 'theme' ? (
          <ThemeComponent
            setEditorTheme={setEditorTheme}
            setModalBottom={setModalBottom}
          />
        ) : null}
      </div>
      {/* <div style={{ position: 'absolute', top: 0, right: 0, width: '150px' }}> */}
      <Minimap
        className='ace-editor-minimap'
        language={language}
        setLanguage={setLanguage}
        editorTheme={editorTheme}
        setEditorTheme={setEditorTheme}
        setModalBottom={setModalBottom}
        selected={selected}
        onChange={onChange}
      />
      {/* </div> */}
    </div>
  )
}

const mapStateToProps = state => ({
  dir: state.directories,
  content: state.content,
  tabs: state.tab,
  selected: state.selection
})

const mapDispatchToProps = dispatch => ({
  closeTab: x => dispatch(closeTab(x)),
  setContent: x => dispatch(setContent(x)),
  deselectItem: x => dispatch(deselectItem(x)),
  selectItem: x => dispatch(selectItem(x)),
  setSelContent: x => dispatch(setSelContent(x)),
  killTabs: () => dispatch(killTabs())
})

export default connect(mapStateToProps, mapDispatchToProps)(CodePlace)
