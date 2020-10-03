import { DESELECT_ITEM, SELECT_ITEM, SET_SEL_CONTENT } from '../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case DESELECT_ITEM:
      return initialState
    case SELECT_ITEM:
      return action.payload
    case SET_SEL_CONTENT:
      return { ...action.payload }
    default:
      return state
  }
}
