// eslint-disable-next-line
import React, { useState } from 'react'
import ResizePanel from 'react-resize-panel'
import Sidenav from '../styled/sidenav'
import Close from '../styled/close'
import ProjectFolder from '../styled/projectfolder'
import { Icon } from '../styled/folder-styles'
import SideNavContainer from '../styled/sidenavcontainer'
import { UL, LI } from '../styled/list'
import { readFile } from '../utils/readFile'
import File from './File'
import Folder from './Folder'

function SideBar ({ dir, content, setContent, setSelected, selected }) {
  const [open, setOpen] = useState(true)
  const [see, setSee] = useState(true)
  const getContent = item => {
    if (item.type === 'file') {
      setContent(readFile(item.path))
      setSelected(item)
    } else {
      console.log("It's a dir!")
    }
  }
  return (
    <SideNavContainer open={open} style={{ position: 'relative' }}>
      <Close onClick={() => setOpen(!open)} open={open}>
        <i className={`fas fa-chevron-${open ? 'left' : 'right'}`} />
      </Close>
      {open && (
        <ResizePanel
          style={{ minWidth: '80px', height: '100vh' }}
          direction='e'
        >
          <Sidenav>
            {dir && (
              <ProjectFolder className='nowrap' onClick={() => setSee(!see)}>
                {dir.name}
                <Icon>
                  <i
                    className={`fas fa-${
                      see ? 'chevron-down' : 'chevron-right'
                    }`}
                  />
                </Icon>
              </ProjectFolder>
            )}
            <UL>
              {dir &&
                see &&
                dir.children.map(child =>
                  child.type === 'file' ? (
                    <File
                      selected={selected.path}
                      own={child.path}
                      key={child.path}
                      child={child}
                      onClick={() => getContent(child)}
                    />
                  ) : (
                    <Folder
                      onClick={() => getContent(child)}
                      files={child.children}
                      name={child.name}
                      key={child.path}
                      selected={selected}
                    />
                  )
                )}
            </UL>
          </Sidenav>
        </ResizePanel>
      )}
    </SideNavContainer>
  )
}

// <LI
//   selected={selected.path}
//   own={child.path}
//   key={child.path}
//   onClick={() => getContent(child)}
// >
//   {child.name}
// </LI>

export default SideBar
