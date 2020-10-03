import React, { useState } from 'react'
import File from './File'
import truncate from 'truncate'
import {
  MainPadder,
  FolderStuff,
  Icon,
  FolderStuffContainer
} from '../styled/folder-styles'
import { LI } from '../styled/list'
import { connect } from 'react-redux'

function Folder ({ files, selected, name }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MainPadder>
      <FolderStuff onClick={e => setIsOpen(!isOpen)}>
        <FolderStuffContainer>
          <i className='fas fa-folder' />
          <Icon
            className={`fas fa-${isOpen ? 'chevron-down' : 'chevron-right'}`}
          />
          <span>{truncate(name, 15)}</span>
        </FolderStuffContainer>
      </FolderStuff>
      {isOpen &&
        files.length > 0 &&
        files.map((file, i) =>
          file.type === 'directory' ? (
            <LI key={file.path} selected={selected.path} own={file.path}>
              <Folder files={file.children} name={file.name} key={file.path} />
            </LI>
          ) : (
            file.type === 'file' &&
            isOpen && (
              <File key={file.path} selected={selected.path} child={file} />
            )
          )
        )}
    </MainPadder>
  )
}

const mapStateToProps = state => ({
  selected: state.selection
})

export default connect(mapStateToProps)(Folder)
