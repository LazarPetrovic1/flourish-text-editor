import { SET_DIR_LIST } from '../actions/types'
import { removeDuplicateObjectState } from '../utils/removeDuplicateObjectState'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIR_LIST:
      const newState = removeDuplicateObjectState([...state, action.payload])
      if (state.length < 9) {
        return newState
      }
      break
    default:
      return state
  }
}
