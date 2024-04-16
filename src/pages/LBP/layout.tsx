import React from 'react'

import Header from 'components/Header'
import styled from 'styled-components'
import { useSetHideHeader } from 'state/application/hooks'

interface Props {
  background?: string
}

export const LbpLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])
  return (
    <>
      <Header />
      <LbpContainer background={props.background}>{props.children}</LbpContainer>
    </>
  )
}

export const LbpContainer = styled.div<{ background?: string }>`
  min-height: 100vh;
  padding: 0 4rem;
  margin-top: 90px;
  width: 100vw;
  font-family: ${(props) => props.theme.launchpad.font};
  background: ${(props) => props.background ?? props.theme.launchpad.colors.background};

  * {
    font-family: ${(props) => props.theme.launchpad.font};
  }
`
