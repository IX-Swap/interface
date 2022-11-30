import React from 'react'
import styled from 'styled-components'

import Portal from '@reach/portal'

import { Offers } from 'components/Launchpad/Offers'

import { useSetHideHeader } from 'state/application/hooks'

import { Banner } from './Banner'
import { Header } from './Header'
import { Footer } from './Footer'
import { TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import { CenteredFixed } from 'components/LaunchpadOffer/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'

export default function Launchpad() {
  const { library, chainId, account } = useActiveWeb3React()
  
  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])
  
  const blurred = React.useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0) || !account, 
    [account, chainId]
  )

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
    <LaunchpadContainer>
      <Header />
      <Banner />
      <Offers />
      <Footer />
    </LaunchpadContainer>
  )
}

const LaunchpadContainer = styled.div`
  padding: 0 4rem;

  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`
