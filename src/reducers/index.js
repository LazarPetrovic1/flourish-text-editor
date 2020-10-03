import { combineReducers } from 'redux'
import tab from './tab'
import selection from './selection'
import dirlist from './dirlist'
// import preferences from './preferences'
import content from './content'
import directories from './directories'

export default combineReducers({
  tab,
  selection,
  content,
  directories,
  dirlist
})
