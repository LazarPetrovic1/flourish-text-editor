import React from 'react'
import ImageRenderer from '../../styled/imagerenderer'
import ImageEditor from '@toast-ui/react-image-editor'

function ImageComponent ({ selected }) {
  return (
    <ImageRenderer>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: `root://${selected.path}`,
            name: selected.name
          },
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter'
          ],
          initMenu: 'filter',
          uiSize: {
            width: '90%',
            height: '85%'
          },
          menuBarPosition: 'bottom'
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics
      />
      <h3 style={{ marginTop: '1rem' }}>
        <b>NOTE:</b> The Image Editor hasn't been tested yet.
      </h3>
    </ImageRenderer>
  )
}

export default ImageComponent
