import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

import Header from 'components/Header'
import { useSetHideHeader } from 'state/application/hooks'
import { useRole } from 'state/user/hooks'

interface Props {
  background?: string
}

export const LbpLayout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const hideHeader = useSetHideHeader()
  const { isAdmin } = useRole()
  const { account } = useWeb3React()
  const history = useHistory()

  useEffect(() => {
    if (!account || !isAdmin) {
      history.replace('/kyc')
    }
  } , [account, isAdmin])

  useEffect(() => {
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
