import { SET_TAB, FILTER_TABS, KILL_TABS } from '../actions/types'
import { removeDuplicateObjectState } from '../utils/removeDuplicateObjectState'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      return removeDuplicateObjectState([...state, action.payload])
    case FILTER_TABS:
      const newState = state.filter(t => t.path !== action.payload)
      return newState
    case KILL_TABS:
      return initialState
    default:
      return state
  }
}
