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
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import { LaunchpadWhitelistWallet } from 'components/Launchpad/LaunchpadWhitelistWallet'

export default function Launchpad() {
  const { chainId, account } = useActiveWeb3React()

  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const blurred = React.useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0),
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
      <LaunchpadWhitelistWallet offerId="33d8cc25-6fcb-4188-83b1-63b196763b0e" />
      <Footer />
    </LaunchpadContainer>
  )
}

export const LaunchpadContainer = styled.div<{ background?: string }>`
  min-height: 100vh;
  padding: 0 4rem;

  font-family: ${(props) => props.theme.launchpad.font};
  background: ${(props) => props.background ?? props.theme.launchpad.colors.background};
`
