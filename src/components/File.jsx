import React from 'react'
import truncate from 'truncate'
import { LI } from '../styled/list'
import { connect, batch } from 'react-redux'
import { setContent } from '../actions/content'
import { selectItem } from '../actions/selection'
import { setTab } from '../actions/tab'
import { readFile } from '../utils/readFile'
import { v4 as uuid } from 'uuid'
import store from '../store'
import { SELECT_ITEM, SET_CONTENT, SET_TAB } from '../actions/types'

function File ({
  child,
  selected,
  setContent,
  content,
  tabs,
  setSelected,
  setTab
}) {
  const updateAllFileStuff = child => {
    const payload = { content: readFile(child.path) }
    const tablet = {
      id: uuid(),
      ...child,
      content: readFile(child.path),
      actualContent: readFile(child.path)
    }
    try {
      batch(() => {
        store.dispatch({ type: SELECT_ITEM, payload: tablet })
        store.dispatch({ type: SET_CONTENT, payload })
        store.dispatch({ type: SET_TAB, payload: tablet })
      })
    } catch (e) {
      console.warn('%c Warning error', 'color: navy; font-weigth: bold;', e)
    }
  }

  return (
    <LI
      selected={selected.path}
      own={child.path}
      title={child.name}
      onClick={() => updateAllFileStuff(child)}
    >
      {truncate(child.name, 15)}
    </LI>
  )
}

const mapStateToProps = state => ({
  selected: state.selection,
  tabs: state.tab,
  content: state.content
})

const mapDispatchToProps = dispatch => ({
  setContent: x => dispatch(setContent(x)),
  selectItem: x => dispatch(selectItem(x)),
  setTab: x => dispatch(setTab(x))
})

export default connect(mapStateToProps, mapDispatchToProps)(File)
