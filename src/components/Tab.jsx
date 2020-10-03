import React, { useState, useEffect } from 'react'
import FileTab from '../styled/filetab'
import { connect, batch } from 'react-redux'
import { all } from '../actions/all'
import {
  FILTER_TABS,
  SELECT_ITEM,
  DESELECT_ITEM,
  KILL_TABS
} from '../actions/types'
import store from '../store'

function Tab ({ tab, tabs, all, selected, actualContent, content }) {
  const [isDifferent, setIsDifferent] = useState(false)
  const onClose = thistab => {
    const foundTab = store
      .getState()
      .tab.find(tab => tab.path !== store.getState().selection.path)
    if (foundTab) {
      batch(() => {
        store.dispatch({ type: FILTER_TABS, payload: thistab.path })
        store.dispatch({ type: SELECT_ITEM, payload: foundTab })
      })
    } else {
      batch(() => {
        store.dispatch({ type: KILL_TABS, payload: thistab.path })
        store.dispatch({ type: DESELECT_ITEM })
      })
    }
  }

  useEffect(() => {
    if (selected.actualContent !== selected.content) {
      setIsDifferent(true)
    } else {
      setIsDifferent(false)
    }
    // eslint-disable-next-line
  }, [actualContent, content])

  return (
    <FileTab
      title={tab.path}
      key={tab.path}
      selected={selected.path}
      own={tab.path}
    >
      <span
        onClick={() => all(tab)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {tab.name}
        {isDifferent && <div className='blue-dot-save' />}
      </span>
      <i className='fas fa-times close-tab' onClick={() => onClose(tab)} />
    </FileTab>
  )
}

const mapStateToProps = state => ({
  tabs: state.tab,
  selected: state.selection,
  content: state.content.content
})

const mapDispatchToProps = dispatch => ({
  all: x => dispatch(all(x))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab)
