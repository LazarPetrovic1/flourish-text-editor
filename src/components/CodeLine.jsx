import React, { useState } from 'react'
import CodeLineContainer from '../styled/codelinecontainer'
import CodeLineCard from '../styled/codelinecard'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { isEmpty } from '../utils/isEmpty'
import {
  CodeLineList,
  CodeLineListItem,
  SwitchButton
} from '../styled/codelinelist'

const area = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '🌟']

function CodeLine ({ dirlist, directories, setCodeLine }) {
  const [chosenDir, setChosenDir] = useState({})
  const [list, setList] = useState(true)
  return list ? (
    <div>
      <div className='center-codeline'>
        <h2>Code Line - your previous 9 projects</h2>
        <div style={{ border: '1px solid white' }}>
          <SwitchButton
            style={{ background: list ? 'teal' : 'transparent' }}
            onClick={() => setList(true)}
          >
            <i className='fas fa-list' />
          </SwitchButton>
          <SwitchButton
            style={{ background: list ? 'transparent' : 'teal' }}
            onClick={() => setList(false)}
          >
            <i className='fas fa-th' />
          </SwitchButton>
        </div>
        <button className='close-codeline' onClick={() => setCodeLine(false)}>
          &times;
        </button>
      </div>
      <main className='codeline-container'>
        <section className='codeline-info'>
          {!isEmpty(chosenDir) && (
            <>
              <h2 className='center'>Project overview</h2>
              <hr style={{ margin: '1rem 0' }} />
              <div className='center'>
                <p>ID: {chosenDir.id}</p>
              </div>
              <div className='center'>
                <p>Name: {chosenDir.name}</p>
              </div>
              <div className='center'>
                <p>Path: {chosenDir.path}</p>
              </div>
              <div className='center'>
                <p>Size: {chosenDir.size}</p>
              </div>
              <div className='center'>
                <p>
                  Opened:{' '}
                  <Moment format='DD.MM.YYYY hh:mm'>{chosenDir.opened}</Moment>
                </p>
              </div>
              <div className='center' style={{ margin: '1rem 0' }}>
                <button
                  style={{
                    outline: 0,
                    border: 0,
                    backgroundColor: 'rgb(49, 124, 23)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '20px',
                    fontSize: '18px',
                    cursor: 'pointer'
                  }}
                >
                  Select
                </button>
              </div>
            </>
          )}
        </section>
        <aside className='codeline-list'>
          <CodeLineList>
            {dirlist.map(dir => (
              <CodeLineListItem
                key={dir.id}
                title={dir.path}
                onClick={() => setChosenDir(dir)}
                style={{
                  background:
                    chosenDir.id === dir.id ? 'rgb(25, 57, 196)' : 'transparent'
                }}
              >
                {dir.name}
              </CodeLineListItem>
            ))}
          </CodeLineList>
        </aside>
      </main>
    </div>
  ) : (
    <div>
      <div className='center-codeline'>
        <h2>Code Line - your previous 9 projects</h2>
        <div style={{ border: '1px solid white' }}>
          <SwitchButton
            style={{ background: list ? 'teal' : 'transparent' }}
            onClick={() => setList(true)}
          >
            <i className='fas fa-list' />
          </SwitchButton>
          <SwitchButton
            style={{ background: list ? 'transparent' : 'teal' }}
            onClick={() => setList(false)}
          >
            <i className='fas fa-th' />
          </SwitchButton>
        </div>
        <button className='close-codeline' onClick={() => setCodeLine(false)}>
          &times;
        </button>
      </div>
      <CodeLineContainer>
        {dirlist.length <= 0 ? (
          <CodeLineCard area='🌟' order={0} selected>
            <h2 style={{ color: '#FFD700', textAlign: 'center' }}>
              No projects
            </h2>
            <p>
              Please press <code>Ctrl + Shift + O</code> to open a project
              folder
            </p>
          </CodeLineCard>
        ) : (
          dirlist.map((dir, i) => (
            <CodeLineCard
              key={i}
              area={dir.path === directories.path ? '🌟' : area[i]}
              order={i}
              selected={dir.path === directories.path}
            >
              <h2>
                {dir.path === directories.path
                  ? '* Selected project'
                  : `CodeLine Project ${i + 1}`}
              </h2>
              <div>
                <p>ID: {dir.id}</p>
              </div>
              <div>
                <p>Name: {dir.name}</p>
              </div>
              <div>
                <p>Path: {dir.path}</p>
              </div>
              <div>
                <p>Size: {dir.size}</p>
              </div>
              <div>
                <p>
                  Opened:{' '}
                  <Moment format='DD.MM.YYYY hh:mm'>{chosenDir.opened}</Moment>
                </p>
              </div>
            </CodeLineCard>
          ))
        )}
      </CodeLineContainer>
    </div>
  )
}

const mapStateToProps = state => ({
  dirlist: state.dirlist,
  directories: state.directories
})

export default connect(mapStateToProps, null)(CodeLine)
