import React from 'react'
import styled, { keyframes } from 'styled-components'

import { ReactComponent as Loading } from 'assets/launchpad/svg/loader.svg'

export const ConnectionLoader = () => {
  return (
    <ConnectionLoaderContainer>
      <LoaderAnimationContainer>
        <Loading />
      </LoaderAnimationContainer>

      <ConnectionLoaderLabel>
        Connecting...
      </ConnectionLoaderLabel>

    </ConnectionLoaderContainer>
  )
}

const ConnectionLoaderContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  gap: 1.5rem;
  padding: 2rem;
`

const ConnectionLoaderLabel = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  line-height: 24px;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const LoaderAnimationContainer = styled.svg`
  animation: 2s ${rotate} linear infinite;
  
  width: 45px;
  height: 45px;
`


