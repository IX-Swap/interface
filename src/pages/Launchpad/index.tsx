import React from 'react'
import styled from 'styled-components'
import Portal from '@reach/portal'

import { Offers } from 'components/Launchpad/Offers'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Banner } from './Banner'
import { MEDIA_WIDTHS } from 'theme'
import { CHAINS } from 'components/Web3Provider/constants'
import { useActiveWeb3React } from 'hooks/web3'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'

const BannerWrapper = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  margin-top: -41px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: auto;
    margin-top: 0px;
  }
`

export default function Launchpad() {
  const { config } = useWhitelabelState()
  const { chainId, account } = useActiveWeb3React()

  const isIxSwap = config?.isIxSwap ?? false
  const enableLaunchpadBanner = config?.enableLaunchpadBanner ?? false
  const chains = CHAINS ? CHAINS.map((chain) => chain.id) : []

  return (
    <>
      {isIxSwap || enableLaunchpadBanner ? (
        <BannerWrapper>
          <Banner />
        </BannerWrapper>
      ) : null}
      <Offers />

      {account && !chains.includes(chainId) ? (
        <Portal>
          <CenteredFixed width="100vw" height="100vh">
            <NotAvailablePage />
          </CenteredFixed>
        </Portal>
      ) : null}
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
