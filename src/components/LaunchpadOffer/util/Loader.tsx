import React from 'react'
import styled, { keyframes } from 'styled-components'

import { ReactComponent as LoaderIcon } from 'assets/launchpad/svg/loader.svg'

interface Props {
  size?: string
}

export const Loader: React.FC<Props> = (props) => {
  return (
    <Container {...props}>
      <LoaderIcon />
    </Container>
  )
}

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Container = styled.div<Props>`
  animation: 2s ${rotate} linear infinite;

  padding: 0;
  margin: 0;
  border: none;
  
  width: ${props => props.size ?? '40px'};
  height: ${props => props.size ?? '40px'};

  svg {
    width: ${props => props.size ?? '40px'};
    height: ${props => props.size ?? '40px'};
  }
`
