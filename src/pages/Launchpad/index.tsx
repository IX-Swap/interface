import React from 'react'
import styled from 'styled-components'

import { Offers } from 'components/Launchpad/Offers'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { Banner } from './Banner'
import { MEDIA_WIDTHS } from 'theme'

export default function Launchpad() {
  const { config } = useWhitelabelState()

  const isIxSwap = config?.isIxSwap ?? false
  const enableLaunchpadBanner = config?.enableLaunchpadBanner ?? false

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
