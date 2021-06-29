import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Lights } from 'assets/images/bg-lights.svg'

const Background = styled.div`
    position: absolute;
    z-index: -100;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    filter: blur(120px);
    display: flex;
    align-items: center;
    justify-content: center;
}
`

const LightWrapper = styled(Lights)`
  overflow: hidden;
`
export const AppBackground = () => {
  return (
    <Background>
      <LightWrapper />
    </Background>
  )
}
