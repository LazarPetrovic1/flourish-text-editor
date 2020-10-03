import React from 'react'
import Tab from './Tab'
import { connect } from 'react-redux'

function Tabs ({ tabs, actualContent }) {
  return tabs ? (
    <div className='tabs-all'>
      {tabs.map(tab => (
        <Tab tab={tab} key={tab.path} actualContent={actualContent} />
      ))}
    </div>
  ) : null
}

const mapStateToProps = state => ({
  tabs: state.tab
})

export default connect(mapStateToProps, null)(Tabs)
