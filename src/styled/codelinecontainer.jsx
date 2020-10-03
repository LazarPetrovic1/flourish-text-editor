// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const CodeLineContainer = styled.article`
  padding: 0 1rem;
  height: calc(100vh - 7rem);
  margin-bottom: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    'a  b  c '
    'h  🌟 d'
    'g  f  e';

  grid-template-rows: repeat(3, 33%);
  grid-template-columns: repeat(3, 1fr);
`

export default CodeLineContainer
