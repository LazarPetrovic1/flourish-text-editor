import { SET_TAB, FILTER_TABS, KILL_TABS } from './types'

export const setTab = payload => dispatch => {
  try {
    return dispatch({ type: SET_TAB, payload: payload })
  } catch (e) {
    console.warn(e.message)
  }
}

export const closeTab = payload => (
  dispatch // payload is filePath
) => dispatch({ type: FILTER_TABS, payload })

export const killTabs = () => dispatch => dispatch({ type: KILL_TABS })
