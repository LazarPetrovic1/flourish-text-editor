import { SET_DIRECTORY } from './types'
export const setDirectory = children => dispatch => {
  try {
    dispatch({
      type: SET_DIRECTORY,
      payload: children
    })
  } catch (e) {
    console.warn(e.message)
  }
}
