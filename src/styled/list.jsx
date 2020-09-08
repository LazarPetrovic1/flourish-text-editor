// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

export const UL = styled.ul`
  list-style-type: none;
  display: block;
  padding: 0;
  font-size: 1.2rem;
`

export const LI = styled.li`
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  background-color: ${props =>
    props.selected === props.own ? 'rgb(34, 87, 149)' : 'transparent'};
`
