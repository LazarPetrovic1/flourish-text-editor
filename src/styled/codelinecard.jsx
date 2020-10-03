// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'

const staggerDelay = '100ms'

const CodeLineCard = styled.article`
  animation: cardEntrance 700ms ease-out;
  animation-fill-mode: backwards;
  grid-area: ${props => props.area};
  animation-delay: ${props => staggerDelay * props.order};
  border: ${props =>
    props.selected ? '5px ridge #FFD700' : '1px solid white'};
  ${props => props.selected && 'box-shadow: 0px 0px 50px 5px #000000'};
  ${props => '-webkit-box-shadow: 0px 0px 30px 5px #000000;'};
  padding: 1rem;
  cursor: pointer;
`

// '5px double rgb(44, 132, 196)'

export default CodeLineCard
