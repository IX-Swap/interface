import React from 'react'
import styled from 'styled-components'

import Portal from '@reach/portal'

import { Offers } from 'components/Launchpad/Offers'

import { useSetHideHeader } from 'state/application/hooks'

import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { Banner } from './Banner'
import { Footer } from './Footer'
import Header from 'components/Header'
// import { Header } from './Header'

export default function Launchpad() {
  const { chainId, account } = useActiveWeb3React()

  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const blurred = React.useMemo(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    if (apiUrl?.includes('dev') || apiUrl?.includes('staging')) {
      return chainId && ![...TGE_CHAINS_WITH_STAKING].includes(chainId || 0)
    } else {
      return chainId && ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0)
    }
  }, [account, chainId])

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NetworkNotAvailable />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <>
      <Header />
      <Banner />
      <Offers />
      <Footer />
    </>
  )
}

export const LaunchpadContainer = styled.div<{ background?: string }>`
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
