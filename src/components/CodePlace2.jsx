// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import ImageRenderer from '../styled/imagerenderer'
import { isImage } from '../utils/isImage'
import { saveFile } from '../utils/saveFile'
import { connect, batch } from 'react-redux'
import { closeTab, killTabs } from '../actions/tab'
import { setContent } from '../actions/content'
import { deselectItem, selectItem, setSelContent } from '../actions/selection'
import HelpRender from '../styled/helprender'
import MarkdownPreview from '@uiw/react-markdown-preview'
import store from '../store'
import {
  FILTER_TABS,
  SELECT_ITEM,
  DESELECT_ITEM,
  KILL_TABS
} from '../actions/types'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

const { ipcRenderer } = window.require('electron')

function CodePlace2 ({
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
    ipcRenderer.on('close-file', closeFile)
    // eslint-disable-next-line
  }, [])

  ipcRenderer.on('save-file', () => {
    // setContent({ content: actualContent })
    // setSelContent({ ...selected, content: actualContent })
    saveFile(selected.path, selected.actualContent)
  })

  const onChange = async e => {
    await setActualContent(e)
    await setSelContent({ ...selected, actualContent: e })
  }

  const closeFile = () => {
    const thisTab = store.getState().tab.find(tab => tab.path === selected.path)
    const foundTab = store
      .getState()
      .tab.find(tab => tab.path !== store.getState().selection.path)
    if (foundTab) {
      batch(() => {
        store.dispatch({ type: FILTER_TABS, payload: thisTab.path })
        store.dispatch({ type: SELECT_ITEM, payload: foundTab })
      })
    } else {
      batch(() => {
        store.dispatch({ type: KILL_TABS, payload: thisTab.path })
        store.dispatch({ type: DESELECT_ITEM, payload: foundTab })
      })
    }
  }

  return image ? (
    <ImageRenderer>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: `root://${selected.path}`,
            name: selected.name
          },
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter'
          ],
          initMenu: 'filter',
          uiSize: {
            width: '90%',
            height: '85%'
          },
          menuBarPosition: 'bottom'
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics
      />
      <h3 style={{ marginTop: '1rem' }}>
        <b>NOTE:</b> The Image Editor hasn't been tested yet.
      </h3>
    </ImageRenderer>
  ) : isHelper ? (
    <>
      <HelpRender>
        <MarkdownPreview source={actualContent} />
      </HelpRender>
    </>
  ) : (
    <div
      className='codespot2'
      style={{
        height: 'calc(100vh - 35px)',
        overflow: 'auto'
      }}
    >
      <AceEditor
        mode='javascript'
        className='ace-editor-main'
        theme='twilight'
        onChange={onChange}
        fontSize={17}
        showPrintMargin={false}
        showGutter
        highlightActiveLine
        value={selected.actualContent}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
        wrapEnabled
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CodePlace2)
