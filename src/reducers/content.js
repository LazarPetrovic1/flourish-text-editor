import { SET_CONTENT } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return { content: action.payload.content.toString() }
    default:
      return state
  }
}
