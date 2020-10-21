// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import ImageRenderer from '../styled/imagerenderer'
import Modal from './Modal'
import { isImage } from '../utils/isImage'
import { saveFile } from '../utils/saveFile'
import { getModes } from '../utils/getModes'
import { getSnippets } from '../utils/getSnippets'
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
  KILL_TABS,
  KILL_CONTENT
} from '../actions/types'
import 'ace-builds/src-noconflict/ext-language_tools'
// import 'ace-builds/src-noconflict/snippets/javascript'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

window.require('ace-builds/src-noconflict/theme-twilight')

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
        mode={language}
        className='ace-editor-main'
        theme={editorTheme}
        name='ACE_EDITOR_INSTANCE'
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
      <div className='bottom-control'>
        <div
          className='bottom-control-item'
          onClick={() => setModalBottom('language')}
        >
          {language && `${language.toUpperCase()}`}
        </div>
        <div
          className='bottom-control-item'
          onClick={() => setModalBottom('theme')}
        >
          {editorTheme &&
            `${editorTheme[0].toUpperCase()}${editorTheme.slice(1)}`}
        </div>
      </div>
      {modalBottom === 'language' ? (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <Modal>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <select
                size={10}
                className='modal-select'
                onChange={e => {
                  if (e.target.value === 'autodetect') {
                    return autoDetectLanguage()
                  } else {
                    setLanguage(e.target.value)
                    require(`ace-builds/src-noconflict/mode-${e.target.value}`)
                  }
                  setModalBottom(false)
                }}
              >
                <option value='autodetect'>Auto detect language</option>
                <option value='abap'>Abap</option>
                <option value='abc'>Abc</option>
                <option value='actionscript'>ActionScript</option>
                <option value='ada'>Ada</option>
                <option value='alda'>Alda</option>
                <option value='applescript'>AppleScript</option>
                <option value='aql'>Aql</option>
                <option value='ascii'>Ascii</option>
                <option value='asl'>Asl</option>
                <option value='c_cpp'>C/C++</option>
                <option value='clojure'>Clojure</option>
                <option value='cobol'>COBOL</option>
                <option value='coffee'>Coffee</option>
                <option value='coldfusion'>ColdFusion</option>
                <option value='csharp'>C#</option>
                <option value='csp'>CSP</option>
                <option value='css'>CSS</option>
                <option value='dart'>Dart</option>
                <option value='dockerfile'>Dockerfile</option>
                <option value='ejs'>EJS</option>
                <option value='elm'>Elm</option>
                <option value='elrlang'>Erlang</option>
                <option value='fsharp'>F#</option>
                <option value='gitignore'>Gitignore</option>
                <option value='glsl'>GLSL</option>
                <option value='golang'>Go/Golang</option>
                <option value='graphqlschema'>GraphQL</option>
                <option value='haml'>Haml</option>
                <option value='handlebars'>Handlebars</option>
                <option value='hjson'>HJSON</option>
                <option value='html'>HTML</option>
                <option value='ini'>Windows settings (ini)</option>
                <option value='io'>IO</option>
                <option value='jack'>Jack</option>
                <option value='jade'>Jade</option>
                <option value='java'>Java</option>
                <option value='javascript'>JavaScript</option>
                <option value='json'>JSON API</option>
                <option value='jsp'>JSP</option>
                <option value='jsx'>JavaScript React (JSX)</option>
                <option value='latex'>LaTeX</option>
                <option value='less'>Less</option>
                <option value='lisp'>Lisp</option>
                <option value='livescript'>LiveScript</option>
                <option value='lsl'>LSL</option>
                <option value='lua'>Lua</option>
                <option value='markdown'>Github Markdown</option>
                <option value='mysql'>MySQL</option>
                <option value='perl'>PERL</option>
                <option value='pgsql'>PGSQL</option>
                <option value='php'>PHP</option>
                <option value='pig'>Pig</option>
                <option value='python'>Python</option>
                <option value='qml'>QML</option>
                <option value='r'>R/Rlang</option>
                <option value='rdoc'>RDOC</option>
                <option value='red'>Red</option>
                <option value='rhtml'>RHTML</option>
                <option value='rst'>RST</option>
                <option value='ruby'>Ruby</option>
                <option value='rust'>Rust</option>
                <option value='sass'>SASS</option>
                <option value='scala'>Scala</option>
                <option value='scss'>Sassy CSS/SCSS</option>
                <option value='sh'>Bash/Terminal</option>
                <option value='sjs'>SJS</option>
                <option value='slim'>Slim</option>
                <option value='sql'>SQL</option>
                <option value='svg'>SVG</option>
                <option value='tex'>TEX</option>
                <option value='txt'>Plaintext</option>
                <option value='tsx'>TypeScript React</option>
                <option value='twig'>Twig</option>
                <option value='typescript'>TypeScript</option>
                <option value='vbscript'>VBScript</option>
                <option value='xml'>XML</option>
                <option value='yaml'>YAML</option>
              </select>
              <div
                style={{
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: '1px solid white',
                  margin: '1rem 0',
                  padding: '0.5rem 1rem'
                }}
                onClick={() => setModalBottom(false)}
              >
                Close
              </div>
            </div>
          </Modal>
        </section>
      ) : modalBottom === 'theme' ? (
        <section>
          <Modal>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <select
                size={10}
                className='modal-select'
                onChange={e => {
                  setEditorTheme(e.target.value)
                  require(`ace-builds/src-noconflict/theme-${e.target.value}`)
                  setModalBottom(false)
                }}
              >
                <option value='ambiance'>Ambiance</option>
                <option value='chaos'>Chaos</option>
                <option value='chrome'>Chrome</option>
                <option value='clouds'>Clouds</option>
                <option value='clouds_midnight'>Clouds Midnight</option>
                <option value='cobalt'>Cobalt</option>
                <option value='crimson_editor'>Crimson</option>
                <option value='dawn'>Dawn</option>
                <option value='dracula'>Dracula</option>
                <option value='dreamweaver'>Dreamweaver</option>
                <option value='eclipse'>Eclipse</option>
                <option value='github'>GitHub</option>
                <option value='gob'>Gob</option>
                <option value='gruvbox'>Gruvbox</option>
                <option value='idle_fingers'>Idle Fingers</option>
                <option value='iplastic'>IPlastic</option>
                <option value='katzenmilch'>Cat's milk</option>
                <option value='kr_theme'>KR Theme</option>
                <option value='kuroir'>Kuroir</option>
                <option value='marbivore'>Marbivore</option>
                <option value='marbivore_soft'>Marbivore Soft</option>
                <option value='mono_industrial'>Mono Industrial</option>
                <option value='monokai'>Monokai</option>
                <option value='nord_dark'>Nord dark</option>
                <option value='pastel_on_dark'>Pastel on dark</option>
                <option value='solarized_dark'>Solarized dark</option>
                <option value='solarized_light'>Solarized light</option>
                <option value='sqlserver'>SQL server</option>
                <option value='terminal'>Terminal</option>
                <option value='textmate'>Textmate</option>
                <option value='tomorrow'>Tomorrow</option>
                <option value='tomorrow_night'>Tomorrow night</option>
                <option value='tomorrow_night_blue'>Tomorrow night blue</option>
                <option value='tomorrow_night_bright'>
                  Tomorrow night bright
                </option>
                <option value='tomorrow_night_eighties'>
                  Tomorrow night eighties
                </option>
                <option value='twilight'>Twilight</option>
                <option value='vibrant_ink'>Vibrank Ink</option>
                <option value='xcode'>XCode</option>
              </select>
              <div
                style={{
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: '1px solid white',
                  margin: '1rem 0',
                  padding: '0.5rem 1rem'
                }}
                onClick={() => setModalBottom(false)}
              >
                Close
              </div>
            </div>
          </Modal>
        </section>
      ) : null}
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
