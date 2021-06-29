import React from 'react'
import styled from 'styled-components'
import { ReactComponent as BGBottom } from 'assets/images/bg1.svg'
import { ReactComponent as BGTop } from 'assets/images/bg2.svg'

const Background = styled.div`
    position: absolute;
    z-index: -100;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
`
const Rotate = styled.div`
  transform: rotate(-30deg);
`
const TopWrap = styled(BGTop)`
  max-height: 628px;
  max-width: 628px;
  height: 50%;
  width: 50%;

  opacity: 0.06;

  z-index: 0;
  border-radius: 100%;
  overflow: hidden;
`
const BottomWrap = styled(BGBottom)`
  max-width: 559px;
  max-height: 559px;
  height: 50%;
  width: 50%;

  border-radius: 100%;

  opacity: 0.13;
  z-index: -1;
  overflow: hidden;
`
export const AppBackground = () => {
  return (
    <Background>
      <Rotate>
        <TopWrap />
        <BottomWrap />
      </Rotate>
    </Background>
  )
}
