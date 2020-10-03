import { DESELECT_ITEM, SELECT_ITEM, SET_SEL_CONTENT } from './types'

export const deselectItem = () => dispatch => dispatch({ type: DESELECT_ITEM }) // returns {}
export const selectItem = payload => dispatch => {
  try {
    dispatch({ type: SELECT_ITEM, payload })
  } catch (e) {
    console.warn(e.message)
  }
}
export const setSelContent = payload => dispatch =>
  dispatch({ type: SET_SEL_CONTENT, payload })
