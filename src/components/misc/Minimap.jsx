import React from 'react'
import EditorComponent from './EditorComponent'

function Minimap ({
  language,
  setLanguage,
  editorTheme,
  setEditorTheme,
  setModalBottom,
  selected,
  onChange,
  className
}) {
  return (
    <div className='minimap-container'>
      <EditorComponent
        name='ACE_EDITOR_MINIMAP'
        className={className}
        language={language}
        setLanguage={setLanguage}
        editorTheme={editorTheme}
        setEditorTheme={setEditorTheme}
        setModalBottom={setModalBottom}
        selected={selected}
        onChange={onChange}
        needsBot={false}
      />
    </div>
  )
}

export default Minimap
