import React, { useState } from 'react'
import TextLine from '../styled/textline'

function TextLineInput ({ text }) {
  const [textVal, setTextVal] = useState(text)
  const onChange = e => {
    e.persist()
    setTextVal(e.target.value)
  }

  const onClick = e => {
    e.persist()
    e.preventDefault()
  }
  return (
    <TextLine
      type='text'
      value={textVal}
      onClick={onClick}
      onChange={onChange}
    />
  )
}

export default TextLineInput
