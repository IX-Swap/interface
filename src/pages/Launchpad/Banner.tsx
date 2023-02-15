import React from 'react'
import styled from 'styled-components'

import LearnMoreIcon from 'assets/launchpad/icons/learn-more.png'
import { text31, text6 } from 'components/LaunchpadMisc/typography'

export const Banner = () => {
  return (
    <BannerContainer>
      <BannerTitle>Invest in Startups and Other Unicorn-Like Opportunites</BannerTitle>

      <BannerInfoRedirect>
        <BannerInfoRedirectImage src={LearnMoreIcon} />
        <BannerInfoRedirectLabel>
          <BannerInfoRedirectTitle>How does IXS Launchpad work?</BannerInfoRedirectTitle>
          <BannerInfoRedirectSubtitle href="https://academy.ixswap.io/">Learn more</BannerInfoRedirectSubtitle>
        </BannerInfoRedirectLabel>
      </BannerInfoRedirect>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};
  margin: 4rem auto;
`

const BannerTitle = styled.div`
  color: ${(props) => props.theme.launchpad.colors.text.title};

  max-width: 640px;

  font-family: ${(props) => props.theme.launchpad.font};

  font-style: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 110%;
  letter-spacing: -0.03em;

  margin-bottom: 2rem;
`

const BannerInfoRedirect = styled.a`
  border: 1px solid #e6e6ff;
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
