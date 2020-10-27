import React, { useEffect } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/ext-code_lens'
import 'ace-builds/src-noconflict/ext-elastic_tabstops_lite'
import 'ace-builds/src-noconflict/ext-emmet'
import 'ace-builds/src-noconflict/ext-error_marker'
import 'ace-builds/src-noconflict/ext-keybinding_menu'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-linking'
import 'ace-builds/src-noconflict/ext-modelist'
import 'ace-builds/src-noconflict/ext-options'
import 'ace-builds/src-noconflict/ext-prompt'
// import 'ace-builds/src-noconflict/ext-rtl'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/ext-settings_menu'
import 'ace-builds/src-noconflict/ext-spellcheck'
import 'ace-builds/src-noconflict/ext-split'
import 'ace-builds/src-noconflict/ext-static_highlight'
import 'ace-builds/src-noconflict/ext-statusbar'
import 'ace-builds/src-noconflict/ext-textarea'
import 'ace-builds/src-noconflict/ext-themelist'
import 'ace-builds/src-noconflict/ext-whitespace'
import 'ace-builds/src-noconflict/keybinding-sublime'

window.require('ace-builds/src-noconflict/theme-twilight')

// setOptions={{
//   enableBasicAutocompletion: true,
//   enableLiveAutocompletion: true,
//   enableSnippets: true,
//   showLineNumbers: true,
//   tabSize: 2
// }}

function EditorComponent ({
  language,
  setLanguage,
  editorTheme,
  setEditorTheme,
  setModalBottom,
  selected,
  onChange,
  name,
  className,
  needsBot,
  ref
}) {
  useEffect(() => {
    const minimapScroll = document.querySelector(
      '#ACE_EDITOR_MINIMAP .ace_scrollbar.ace_scrollbar-v'
    )
    const mainScroll = document.querySelector(
      '#ACE_EDITOR_COMPONENT .ace_scrollbar.ace_scrollbar-v'
    )

    minimapScroll.addEventListener(
      'scroll',
      e => (mainScroll.scrollTop = minimapScroll.scrollTop)
    )
    mainScroll.addEventListener(
      'scroll',
      e => (minimapScroll.scrollTop = mainScroll.scrollTop)
    )
    return () => {
      minimapScroll.removeEventListener(
        'scroll',
        e => (mainScroll.scrollTop = minimapScroll.scrollTop)
      )
      mainScroll.removeEventListener(
        'scroll',
        e => (minimapScroll.scrollTop = mainScroll.scrollTop)
      )
    }
  }, [])

  return (
    <>
      <AceEditor
        ref={ref && ref}
        mode={language}
        className={className}
        theme={editorTheme}
        name={name}
        onChange={onChange}
        // onChange={e => console.log(e)}
        fontSize={17}
        showPrintMargin={false}
        showGutter
        keyboardHandler='sublime'
        focus
        highlightActiveLine
        // value={selected.actualContent}
        defaultValue={selected.actualContent}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        showLineNumbers
        tabSize={2}
        wrapEnabled
      />
      {needsBot && (
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
      )}
    </>
  )
}

export default EditorComponent
