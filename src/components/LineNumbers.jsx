// eslint-disable-next-line
import React from 'react'
import Numbered from '../styled/numbered'

function LineNumbers ({ lineNumbers }) {
  const item = []

  for (let i = 1; i < lineNumbers + 1; i++) {
    item.push(<div>{i}</div>)
  }

  return <Numbered>{item.map(i => i)}</Numbered>
}

export default LineNumbers
