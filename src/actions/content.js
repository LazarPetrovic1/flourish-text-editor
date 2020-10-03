import { SET_CONTENT } from './types'

export const setContent = payload => async dispatch => {
  try {
    dispatch({ type: SET_CONTENT, payload })
  } catch (e) {
    console.warn(
      'This is a warning from CONTENT ACTION. This is the payload',
      payload
    )
  }
}
