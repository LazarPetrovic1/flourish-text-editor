// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  background-color: transparent;
  color: white;
  display: block;
  width: calc(100% - 1rem);
  outline: none;
  border: none;
  overflow: auto;
  font-size: 1.2rem;
  height: 100vh;
  resize: none;
`

export default TextArea
