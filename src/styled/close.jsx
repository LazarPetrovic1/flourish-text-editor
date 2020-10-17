// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const Close = styled.span`
  position: absolute;
  right: ${props => (props.open ? '-0.4rem' : '-1rem')};
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: 2px solid black;
  background-color: black;
  font-size: 1.5rem;
  padding: 0.25rem 0.6rem;
  border-radius: 50%;
  cursor: pointer;
`

export default Close
