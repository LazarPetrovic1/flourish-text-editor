import { SET_CONTENT, KILL_CONTENT } from './types'

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

export const killContent = dispatch => dispatch({ KILL_CONTENT })
