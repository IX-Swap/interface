import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Milkyway } from 'assets/images/milky-way.svg'

const Background = styled.div`
  z-index: -50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`
const LightWrapper = styled(Milkyway)`
  position: fixed;
  overflow: hidden;
  top: 20vh;
`
export const LightBackground = () => {
  return (
    <Background>
      <LightWrapper />
    </Background>
  )
}
