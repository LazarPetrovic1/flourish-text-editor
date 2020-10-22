import React from 'react'
import HelpRender from '../../styled/helprender'
import MarkdownPreview from '@uiw/react-markdown-preview'

function HelperRenderingComponent ({ actualContent }) {
  return (
    <HelpRender>
      <MarkdownPreview source={actualContent} />
    </HelpRender>
  )
}

export default HelperRenderingComponent
