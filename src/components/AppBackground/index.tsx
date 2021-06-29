import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Lights } from 'assets/images/bg-lights.svg'

const Background = styled.div`
    position: absolute;
    z-index: -100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex; 
    align-items: center;
    justify-content: center;
}
`

const LightWrapper = styled(Lights)`
  position: absolute;
  top: 0;
  filter: blur(120px);
`
export const AppBackground = () => {
  return (
    <Background>
      <LightWrapper />
    </Background>
  )
}
