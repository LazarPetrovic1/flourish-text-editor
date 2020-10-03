// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const FileTab = styled.div`
  padding: 0.5rem 1rem;
  min-width: 130px;
  display: grid;
  place-items: center;
  border-right: 1px solid black;
  position: relative;
  background-color: ${props =>
    props.selected === props.own ? 'rgb(91, 94, 87)' : 'rgb(52, 54, 50)'};
  cursor: default;
  user-select: none;
`

export default FileTab
