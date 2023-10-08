import React from 'react'
import styled from 'styled-components'

import LearnMoreIcon from 'assets/launchpad/icons/learn-more.png'
import { text31, text52, text6 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'

export const Banner = () => {
  return (
    <BannerContainer>
      <BannerTitle>
        Invest in Startups <br /> and Other Unicorn <br /> Like Opportunites
      </BannerTitle>

      <BannerInfoRedirect>
        <BannerInfoRedirectImage src={LearnMoreIcon} />
        <BannerInfoRedirectLabel>
          <BannerInfoRedirectTitle>How does IXS Launchpad work?</BannerInfoRedirectTitle>
          <BannerInfoRedirectSubtitle href="https://www.ixswap.io/academy">Learn more</BannerInfoRedirectSubtitle>
        </BannerInfoRedirectLabel>
      </BannerInfoRedirect>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};
  margin: 8rem auto;
  width: 100%;
`

const BannerTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-family: ${(props) => props.theme.launchpad.font};
  ${text52}
  margin-bottom: 2rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 48px;
  }
`

const BannerInfoRedirect = styled.a`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 80px;
  gap: 2rem;
  width: 375px;
`

const BannerInfoRedirectImage = styled.img`
  border-radius: 4px;
`
const BannerInfoRedirectLabel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  max-width: 60%;
`

const BannerInfoRedirectTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};

  font-family: ${(props) => props.theme.launchpad.font};
  ${text31}
`

const BannerInfoRedirectSubtitle = styled.a`
  color: ${(props) => props.theme.launchpad.colors.primary};

  font-family: ${(props) => props.theme.launchpad.font};
  ${text6}
  text-decoration: none;
`
