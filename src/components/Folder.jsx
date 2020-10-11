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
              <div className='folder-dropdown'>
                <File key={file.path} selected={selected.path} child={file} />
              </div>
            )
          )
        )}
    </MainPadder>
  )
}

const mapStateToProps = state => ({
  selected: state.selection
})

// GET INFO

// const getInfo = (file, pass = true) => {
//     if (file.type === 'directory') return
//     const content = fs.readFileSync(file.path).toString()
//     if (pass) {
//       setTextValue(content)
//       setSelected(file)
//     }
//
//     return (
//       file && (
//         <div className='container'>
//           <CodeMirror
//             autoCursor
//             value={textValue}
//             options={{
//               theme: getTheme(theme),
//               keyMap: getKeyMap(keyMap),
//               lineWrapping: lineWrap,
//               scrollbarStyle: 'overlay',
//               mode: getMode(mode || (file && file.name.split('.')[1])),
//               lineNumbers: true,
//               matchBrackets: true,
//               matchTags: true,
//               autoCloseBrackets: true
//             }}
//             onKeyDown={(editor, event) => {
//               console.log({ editor, event })
//             }}
//             onBeforeChange={(editor, data, value) => {
//               setTextValue(value)
//             }}
//             onChange={(editor, data, value) => {}}
//             onKeyDown={async (editor, e) => {
//               if (e.keyCode === 116) {
//                 await fs.writeFile(
//                   path.resolve(selected.dir, selected.name),
//                   e.target.value.toString(),
//                   err => {
//                     if (err) console.error(err)
//                   }
//                 )
//               }
//             }}
//           />
//         </div>
//       )
//     )
//   }

export default connect(mapStateToProps)(Folder)
