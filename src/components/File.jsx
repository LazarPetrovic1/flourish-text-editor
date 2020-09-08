import React from 'react'
import truncate from 'truncate'
import { LI } from '../styled/list'

function File ({ selected, own, onClick, child }) {
  return (
    <LI selected={selected} own={own} onClick={() => onClick(child)}>
      {child.name}
    </LI>
  )
}

export default File
