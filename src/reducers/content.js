import { SET_CONTENT, KILL_CONTENT } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return { content: action.payload.content.toString() }
    case KILL_CONTENT:
      return initialState
    default:
      return state
  }
}
