export const getKeybindings = name => {
  switch (name) {
    case 'emacs':
      return 'keybinding-emacs'
    case 'sublime':
      return 'keybinding-sublime'
    case 'vim':
      return 'keybinding-vim'
    default:
      return 'keybinding-sublime'
  }
}
