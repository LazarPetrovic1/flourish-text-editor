// eslint-disable-next-line
import React, { useState } from 'react'
import ResizePanel from 'react-resize-panel'
import Sidenav from '../styled/sidenav'
import Close from '../styled/close'
import ProjectFolder from '../styled/projectfolder'
import { Icon } from '../styled/folder-styles'
import SideNavContainer from '../styled/sidenavcontainer'
import Modal from './Modal'
import ModalInput from '../styled/modalinput'
import ModalInputContainer from '../styled/modalinputcontainer'
import ModalButton from '../styled/modalbutton'
import { UL } from '../styled/list'
import File from './File'
import { isEmpty } from '../utils/isEmpty'
import Folder from './Folder'
import { connect, batch } from 'react-redux'
import { writeFile } from '../utils/writeFile'
import { deleteFile } from '../utils/deleteFile'
import { setDirectory } from '../actions/directories'
import { setContent } from '../actions/content'
import { closeTab, setTab } from '../actions/tab'
const dirTree = window.require('directory-tree')
// import dirTree from 'directory-tree'

const { ipcRenderer } = window.require('electron')

function SideBar ({ content, setContent, dir, setDirectory, tabs, selected }) {
  const [open, setOpen] = useState(true)
  const [see, setSee] = useState(true)
  const [modalCreate, setModalCreate] = useState(false)
  const [modalRemove, setModalRemove] = useState(false)
  const [modalPath, setModalPath] = useState('')

  ipcRenderer.on('new-file', (e, homedir) => {
    if (dir.path) {
      setModalPath(`${dir.path}/`)
    } else {
      setModalPath(`${homedir}/`)
    }
    setModalCreate(true)
  })

  ipcRenderer.on('remove-file', () => setModalRemove(true))

  const removeAll = () => {
    const ifTab = tabs.find(tab => tab.path === selected.path)
    const otherTab = tabs.find(tab => tab.path !== selected.path)
    if (ifTab) {
      batch(() => {
        closeTab(ifTab.path)
        setTab(otherTab)
        setContent(otherTab)
      })
    }
    deleteFile(ifTab.path)
    setDirectory(dirTree(dir.path))
    setModalRemove(false)
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
      {modalCreate && (
        <Modal>
          <ModalInputContainer
            onSubmit={async e => {
              e.preventDefault()
              await writeFile(modalPath)
              await setModalCreate(false)
              await setDirectory(dirTree(dir.path))
            }}
          >
            <div>
              <p className='add-p'>
                <i className='fas fa-plus' />
                &nbsp; Enter path for the file to create:
              </p>
              <ModalInput
                type='text'
                autoFocus
                value={modalPath}
                onChange={e => setModalPath(e.target.value)}
                onKeyDown={e => {
                  e.persist()
                  if (e.key === 'Escape') setModalCreate(false)
                }}
              />
            </div>
          </ModalInputContainer>
        </Modal>
      )}
      {modalRemove && (
        <Modal>
          <div>
            <p>Are you sure you want to delete {selected.name}?</p>
            <div className='centralized'>
              <ModalButton onClick={() => removeAll()}>Yes</ModalButton>
              <ModalButton onClick={() => setModalRemove(false)}>
                No
              </ModalButton>
            </div>
          </div>
        </Modal>
      )}
    </SideNavContainer>
  )
}

const mapStateToProps = state => ({
  dir: state.directories,
  tabs: state.tab,
  selected: state.selection
})

const mapDispatchToProps = dispatch => ({
  setDirectory: x => dispatch(setDirectory(x)),
  setContent: x => dispatch(setContent(x)),
  closeTab: x => dispatch(closeTab(x)),
  setTab: x => dispatch(setTab(x))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
