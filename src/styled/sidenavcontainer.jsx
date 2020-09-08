// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const SideNavContainer = styled.article`
  height: 100vh;
  border-right: 2px solid black;
  ${props => !props.open && 'width: 0'};
`

export default SideNavContainer
