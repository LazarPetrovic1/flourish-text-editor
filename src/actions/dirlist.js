import { SET_DIR_LIST } from './types'

export const setDirectoryList = payload => dispatch => {
  try {
    dispatch({
      type: SET_DIR_LIST,
      payload
    })
  } catch (e) {
    console.warn(e.message)
  }
}
