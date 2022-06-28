import { ReactComponent as Lights } from 'assets/images/bg-lights.svg'
import React from 'react'
import styled, { css } from 'styled-components'
import useLightBackground from './useLightBackground'

const Background = styled.div<{ lightBackground: boolean }>`
  position: fixed;
  z-index: -100;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, lightBackground }) => (lightBackground ? theme.bg1 : theme.bg0)};
`

const LightWrapper = styled(Lights)`
  position: absolute;
  top: 0;
  filter: blur(120px);
  ${({ theme }) =>
    theme.config.background &&
    css`
      display: none;
    `}
`
export const AppBackground = () => {
  const { hasLightBackground } = useLightBackground()
  return (
    <Background lightBackground={hasLightBackground}>
      <LightWrapper />
    </Background>
  )
}
