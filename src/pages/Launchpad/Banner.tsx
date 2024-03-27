import React from 'react'
import styled from 'styled-components'

import LearnMoreIcon from 'assets/launchpad/icons/learn-more.png'
import { text31, text52, text6 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'
import { isMobile } from 'react-device-detect'

export const Banner = () => {
  return (
    <BannerContainer>
      {isMobile ? (
        <>
          <BannerTitle>Invest in Startups and Other Unicorn Like Opportunites</BannerTitle>
          <BannerTitleMobile>Next Generation Fundraising</BannerTitleMobile>
        </>
      ) : (
        <BannerTitle>
          Invest in Startups <br /> and Other Unicorn <br /> Like Opportunites
        </BannerTitle>
      )}

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
  margin: 8rem 1rem 0rem 0rem;
  width: 100%;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: 7rem 5rem 0rem 5rem;
  }
`

const BannerTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  font-family: system-ui;

  ${text52}
  margin-bottom: 2rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 13px;
    color: #666680;
    font-weight: 400;
    text-align: center;
  }
`

const BannerTitleMobile = styled.div`
  font-family: ${(props) => props.theme.launchpad.font};
  margin-bottom: 2rem;
  font-size: 45px;
  color: #292933;
  font-weight: 800;
  text-align: center;
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

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
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
