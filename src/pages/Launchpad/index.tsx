import React from 'react'
import styled from 'styled-components'
import Portal from '@reach/portal'
import { Offers } from 'components/Launchpad/Offers'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { useActiveWeb3React } from 'hooks/web3'
import { Banner } from './Banner'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { detectWrongNetwork } from 'utils'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { useWeb3React } from 'connection/web3reactShim'

export default function Launchpad() {
  const { chainId } = useWeb3React()
  const { config } = useWhitelabelState()

  const isIxSwap = config?.isIxSwap ?? false
  const enableLaunchpadBanner = config?.enableLaunchpadBanner ?? false
  console.log('chainId', chainId)
  const blurred = detectWrongNetwork(chainId)


  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NotAvailablePage />
        </CenteredFixed>
      </Portal>
    )
  }

  return (
    <>
      {isIxSwap || enableLaunchpadBanner ? <Banner /> : null}
      <Offers />
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
