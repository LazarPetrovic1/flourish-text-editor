import React, { useState } from 'react'
import File from './File'
import truncate from 'truncate'
import { MainPadder, FolderStuff, Icon } from '../styled/folder-styles'

function Folder({ files, selected, name, onClick }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MainPadder>
      <FolderStuff onClick={e => setIsOpen(!isOpen)}>
        <i className="fas fa-folder" />
        <Icon
          className={`fas fa-${isOpen ? 'chevron-down' : 'chevron-right'}`}
        />
        <span>{truncate(name, 15)}</span>
      </FolderStuff>
      {isOpen &&
        files.length > 0 &&
        files.map(
          ((file, i) =>
            file.type === 'directory' ? (
              <Folder
                onClick={onClick}
                files={file.children}
                name={file.name}
                key={file.path}
                selected={selected}
              />
            ) : (
              file.type === 'file' &&
              isOpen && (
                <div key={file.path}>
                  <File
                    selected={selected.path}
                    own={file.path}
                    key={file.path}
                    child={file}
                    onClick={onClick}
                  />
                </div>
              )
            ): null)
        )}
    </MainPadder>
  )
}

export default Folder
