export const isDoc = filename => {
  const extension = filename
    .split('.')
    [filename.split('.').length - 1].toLowerCase()
  console.log('EXTENSION', extension)

  // SVGs are treated as textual files
  switch (extension) {
    case 'doc':
    case 'docx':
    case 'pdf':
    case 'ppt':
    case 'pptx':
      return true
    default:
      return false
  }
}
