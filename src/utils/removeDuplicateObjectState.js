export const removeDuplicateObjectState = state =>
  Array.from(new Set(state.map(x => x.path))).map(path =>
    state.find(x => x.path === path)
  )
