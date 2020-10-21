export const getExtensions = name => {
  switch (name) {
    case 'beautify':
      return 'ext-beautify'
    case 'code_lens':
      return 'ext-code_lens'
    case 'elastic_tabstops_lite':
      return 'ext-elastic_tabstops_lite'
    case 'emmet':
      return 'ext-emmet'
    case 'error_marker':
      return 'ext-error_marker'
    case 'keybinding_menu':
      return 'ext-keybinding_menu'
    case 'language_tools':
      return 'ext-language_tools'
    case 'linking':
      return 'ext-linking'
    case 'modelist':
      return 'ext-modelist'
    case 'options':
      return 'ext-options'
    case 'prompt':
      return 'ext-prompt'
    case 'rtl':
      return 'ext-rtl'
    case 'searchbox':
      return 'ext-searchbox'
    case 'settings_menu':
      return 'ext-settings_menu'
    case 'spellcheck':
      return 'ext-spellcheck'
    case 'split':
      return 'ext-split'
    case 'static_highlight':
      return 'ext-static_highlight'
    case 'statusbar':
      return 'ext-statusbar'
    case 'textarea':
      return 'ext-textarea'
    case 'themelist':
      return 'ext-themelist'
    case 'whitespace':
      return 'ext-whitespace'
    default:
  }
}
