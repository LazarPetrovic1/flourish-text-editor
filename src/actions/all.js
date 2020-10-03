import { readFile } from '../utils/readFile'
import { batch } from 'react-redux'
import { SET_CONTENT, SET_TAB, SELECT_ITEM } from './types'

export const all = child => dispatch => {
  const payload = { content: readFile(child.path) }
  try {
    batch(() => {
      dispatch({ type: SELECT_ITEM, payload: child })
      dispatch({ type: SET_CONTENT, payload })
      dispatch({ type: SET_TAB, payload: child })
    })
  } catch (e) {
    console.warn('%c Warning error', 'color: navy; font-weigth: bold;', e)
  }
}
