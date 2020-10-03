// eslint-disable-next-line
import React, { useState } from 'react'
import ResizePanel from 'react-resize-panel'
import Sidenav from '../styled/sidenav'
import Close from '../styled/close'
import ProjectFolder from '../styled/projectfolder'
import { Icon } from '../styled/folder-styles'
import SideNavContainer from '../styled/sidenavcontainer'
import { UL } from '../styled/list'
import File from './File'
import { isEmpty } from '../utils/isEmpty'
import Folder from './Folder'
import { connect } from 'react-redux'

function SideBar ({ content, setContent, dir }) {
  const [open, setOpen] = useState(true)
  const [see, setSee] = useState(true)

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
            {!isEmpty(dir) && (
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
              {!isEmpty(dir) &&
                see &&
                dir.children.map(child =>
                  child.type === 'file' ? (
                    <File key={child.path} child={child} />
                  ) : (
                    <Folder
                      files={child.children}
                      name={child.name}
                      key={child.path}
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

const mapStateToProps = state => ({
  dir: state.directories
})

export default connect(mapStateToProps, null)(SideBar)
