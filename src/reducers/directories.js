import { SET_DIRECTORY } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTORY:
      return action.payload
    default:
      return state
  }
}
