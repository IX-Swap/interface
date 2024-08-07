import React from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import LearnMoreIcon from 'assets/launchpad/icons/learn-more.png'
import { text31, text52, text6 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { ReactComponent as LPBackground } from 'assets/images/LPBackground.svg'
import { ReactComponent as LaunchpadHeader } from 'assets/images/lauchpadHeader.svg'

export const Banner = () => {
  const { config } = useWhitelabelState()
  const launchpadBannerTitle =
    config?.launchpadBannerTitle ?? 'Invest in Startups <br /> and Other Unicorn <br /> Like Opportunities'
  const launchpadBannerInfoRedirectTitle = config?.launchpadBannerInfoRedirectTitle ?? 'How does IXS Launchpad work?'
  const launchpadBannerInfoRedirectUrl = config?.launchpadBannerInfoRedirectUrl ?? 'https://www.ixswap.io/academy'

  return (
    <BannerContainer>
      <BannerContent>
        {isMobile ? (
          <>
            <BannerTitle
              dangerouslySetInnerHTML={{ __html: launchpadBannerTitle.replaceAll('<br /> ', '') }}
            ></BannerTitle>
            <BannerTitleMobile>Next Generation Fundraising</BannerTitleMobile>
          </>
        ) : (
          <BannerTitle dangerouslySetInnerHTML={{ __html: launchpadBannerTitle }} />
        )}

        <BannerInfoRedirect>
          <BannerInfoRedirectImage src={LearnMoreIcon} />
          <BannerInfoRedirectLabel>
            <BannerInfoRedirectTitle>{launchpadBannerInfoRedirectTitle}</BannerInfoRedirectTitle>
            <BannerInfoRedirectSubtitle href={launchpadBannerInfoRedirectUrl}>Learn more</BannerInfoRedirectSubtitle>
          </BannerInfoRedirectLabel>
        </BannerInfoRedirect>
      </BannerContent>
      <BannerImage>
        <LPBackgroundWrapper>
          <LPBackground />
          <LaunchpadHeaderWrapper>
            <LaunchpadHeader />
          </LaunchpadHeaderWrapper>
        </LPBackgroundWrapper>
      </BannerImage>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0 0rem 0 -5rem;
  justify-items: right;
  width: 100%;
  height: 100vh;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
    margin: 2rem 1rem 0rem 1rem;
  }
`

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 1rem 0rem 0rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 2rem 1rem 0rem 1rem;
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
  padding: 6px;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 80px;
  gap: 1rem;
  width: 250px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

const BannerInfoRedirectImage = styled.img`
  border-radius: 4px;
  width: 65px;
  margin-top: 7px;
    margin-left: 10px;
`

const BannerInfoRedirectLabel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
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

const BannerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  margin-left: auto;
  padding: 0;
  position: relative;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: auto;
  }
`

const LPBackgroundWrapper = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`

const LaunchpadHeaderWrapper = styled.div`
  position: absolute;
  top: 150px;
`
