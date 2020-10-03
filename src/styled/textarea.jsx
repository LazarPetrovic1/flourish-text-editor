// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  background-color: transparent;
  color: white;
  display: block;
  outline: none;
  border: none;
  font-size: 1.2rem;
  height: calc(100vh - 34px);
  resize: none;
  width: calc(100% - 1rem);
  overflow: hidden;
`

export default TextArea
