import React from 'react'
import styled from 'styled-components'
import Portal from '@reach/portal'
import { Offers } from 'components/Launchpad/Offers'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { useActiveWeb3React } from 'hooks/web3'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { detectWrongNetwork } from 'utils'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Banner } from './Banner'
import { MEDIA_WIDTHS } from 'theme'

const BannerWrapper = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  margin-top: -37px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: auto;
    margin-top: 0px;
  }
`

export default function Launchpad() {
  const { chainId } = useActiveWeb3React()
  const { config } = useWhitelabelState()

  const isIxSwap = config?.isIxSwap ?? false
  const enableLaunchpadBanner = config?.enableLaunchpadBanner ?? false
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
      {isIxSwap || enableLaunchpadBanner ? (
        <BannerWrapper>
          <Banner />
        </BannerWrapper>
      ) : null}
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
