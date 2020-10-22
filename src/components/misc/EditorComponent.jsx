import React, { useEffect } from 'react'
import AceEditor from 'react-ace'

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
