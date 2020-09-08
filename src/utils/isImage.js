export const isImage = filename => {
  const extension = filename
    .split('.')
    [filename.split('.').length - 1].toLowerCase()

  switch (extension) {
    case 'tif':
    case 'tiff':
    case 'jpeg':
    case 'jpg':
    case 'gif':
    case 'png':
      return true
    default:
      return false
  }
}
